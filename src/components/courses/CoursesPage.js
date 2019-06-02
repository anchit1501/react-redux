import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import * as courseActions from '../../redux/actions/CourseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
class CoursesPage extends React.Component{
    componentDidMount(){
        this.props.actions.loadCourses().catch(error=>{
            alert("Loading Courses Failed"+error);
        });
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
    courses:PropTypes.array.isRequired,
    actions:PropTypes.object.isRequired
}
function mapStateToProps(state){
    return {
        courses: state.courses,
        authors:state.authors
    }
}

function mapDispatchToProps(dispatch){
    return {
actions: bindActionCreators(courseActions,dispatch)
};
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);