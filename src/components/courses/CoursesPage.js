import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import * as courseActions from '../../redux/actions/CourseActions';
import * as authorActions from '../../redux/actions/authorActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component{
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

    render(props){
        return(
        <>
            <h2>Courses</h2>
            <CourseList courses={this.props.courses}/>
        </>
            )
    }
}

CoursesPage.propTypes={
    authors:PropTypes.array.isRequired,
    courses:PropTypes.array.isRequired,
    actions:PropTypes.object.isRequired
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
            authors:state.authors
    }
}

function mapDispatchToProps(dispatch){
    return {
actions: {
    loadCourses: bindActionCreators(courseActions.loadCourses,dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuthors,dispatch)
}

};
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);