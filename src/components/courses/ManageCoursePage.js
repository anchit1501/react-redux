import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {loadCourses,saveCourse} from '../../redux/actions/CourseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { stat } from 'fs';
import Spinner from '../common/Spinner';
// import {newCourse} from '../../../tools/mockData';
import {toast} from 'react-toastify';

function ManageCoursePage({courses,authors,loadAuthors,loadCourses,saveCourse,history,...props}){
    const [course,setCourse]=useState({...props.course});
    const [errors,setErrors]=useState({});
    const [saving,setSaving]=useState(false);
    const newCourse={
        id:null,
        title:"",
        authorid:null,
        category:""
    };

  useEffect(() => {
    
        if(courses.length===0){
            loadCourses().catch(error=>{
                alert("Loading Courses Failed"+error);
            });
        }
        else{
            setCourse({...props.course})
        }

        if(authors.length===0){
            loadAuthors().catch(error=>{
                alert("Loading Authors Failed"+error);
            });
        }
      
  }, [props.course]);

  function handleChange(event){
      const {name,value}=event.target;
      setCourse(prevCourse=>({
          ...prevCourse,
          [name]:name === "authorid" ? parseInt(value,10):value
      }));
  }

  function handleSave(event){
    event.preventDefault();
    setSaving(true)
    saveCourse(course)
    .then(()=>{
        toast.success("Couse Saved")
        history.push("/courses");
    });
}
        return authors.length === 0 || courses.length === 0?(
                <Spinner/>
            ):(
            <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave}
            saving={saving}/>
            );
    }

   
ManageCoursePage.propTypes={
    authors:PropTypes.array.isRequired,
    courses:PropTypes.array.isRequired,
    loadCourses:PropTypes.func.isRequired,
    loadAuthors :PropTypes.object.isRequired,
    course : PropTypes.object.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export function getCourseBySlug(courses, slug){
    return courses.find(course=>course.slug === slug)||null;
}
function mapStateToProps(state,ownProps){
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0
    ? getCourseBySlug(state.courses, slug)
    : this.newCourse;
    return {
        course: course,
        courses: state.courses,
        authors:state.authors
    }
}

const mapDispatchToProps={
    loadCourses: loadCourses,
    loadAuthors: authorActions.loadAuthors,
    saveCourse: saveCourse
}

export default connect(mapStateToProps,mapDispatchToProps)(ManageCoursePage);