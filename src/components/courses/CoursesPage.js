import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import * as courseActions from '../../redux/actions/CourseActions';
import {bindActionCreators} from 'redux';
class CoursesPage extends React.Component{
   state = {
       course: {
           title: ""
       }
   };
    
    handleChange=event=>{
        const course = {...this.state.course, title:event.target.value};
        this.setState({course});
    }

    handleSubmit=event=>{
        event.preventDefault();
        console.log('submit',this.state.course)
        this.props.actions.createCourse(this.state.course);
    }

    render(props){
        return(
        <form onSubmit={(event)=>this.handleSubmit(event)}>
            <h2>Courses</h2>
            <h3>Add Couse</h3>
            <input type="text"
            onChange={(event)=>this.handleChange(event)}
            value={this.state.course.title}
            />
            <input type="submit" value="Save"/>
            {this.props.courses.map(course=>
           <div key={course.title}>{course.title}</div>
            )}
        </form>
            )
    }
}

CoursesPage.propTypes={
    courses:PropTypes.array.isRequired,
    actions:PropTypes.object.isRequired
}
function mapStateToProps(state){
    return {
        courses: state.courses
    }
    // this.setState({courses: state.course});
}

function mapDispatchToProps(dispatch){
    return {
actions: bindActionCreators(courseActions,dispatch)
};
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);