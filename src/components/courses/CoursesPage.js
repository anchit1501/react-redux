import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import * as courseActions from '../../redux/actions/CourseActions';
import * as authorActions from '../../redux/actions/authorActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';

class CoursesPage extends React.Component{
    state={
        redirectToAddCoursePage:false
    }

    componentDidMount(){
        const {authors,courses,actions} = this.props;
        if(courses.length===0){
        actions.loadCourses().catch(error=>{
            alert("Loading Courses Failed"+error);
        });
    }
    if(authors.length===0){
        actions.loadAuthors().catch(error=>{
            alert("Loading Authors Failed"+error);
        });
    }
    }

    handleDeleteCourse= async course=>{
        toast.success("Course Deleted");
        try{
            await this.props.actions.deleteCourse(course)
        }catch(error){
            toast.error("Delete Failed." + error.message, {autoClose: false});
    }
}

    render(props){
        return(
        <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course"/>}
            <h2>Courses</h2>
            {this.props.loading?
            <Spinner/>
            :(
            <>
            <button style={{marginBottom:20}}
            className="btn btn-primary add-course"
            label="Add Course"
            onClick={()=>this.setState({redirectToAddCoursePage:true})}>Add</button>
            <CourseList courses={this.props.courses} onDeleteClick={this.handleDeleteCourse}/>
            </>)}
        </>
            )
    }
}

CoursesPage.propTypes={
    authors:PropTypes.array.isRequired,
    courses:PropTypes.array.isRequired,
    actions:PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}
function mapStateToProps(state){
    return {
        courses: state.authors.length ===0
        ?[]
        :state.courses.map(course=>{
            return{
                ...course,
                authorName:state.authors.find(a=>a.id === course.authorid).name
            }}),
            authors: state.authors,
            loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch){
    return {
actions: {
    loadCourses: bindActionCreators(courseActions.loadCourses,dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuthors,dispatch),
    deleteCourse: bindActionCreators(courseActions.deleteCourse,dispatch)
}

};
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);