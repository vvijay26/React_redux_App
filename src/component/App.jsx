import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder,deleteReminder } from '../Actions';
import moment from 'moment';
import '../App.css'

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			text: '',
			dueDate: ''
		}
	}

	addReminder(){
		this.props.addReminder(this.state.text, this.state.dueDate);
	}

	deleteReminder(id){
		console.log("deleting in App.jsx", id);
		console.log('this.props',this.props);
		this.props.deleteReminder(id);
	}

	renderReminders(){
		const { reminders } = this.props;
		return (
			<ul className="list-group col-sm-4">
			{
				//Just to loop through the reminders object, below arrow funciton exprression is created.
				//It is similar in behaviour to reminders.map(function(reminder){<do the steps>}).
				//Arrow function looks neater :-) and also doesnt have its own "this" etc.//
				reminders.map(reminder  => {
					return(
						<li key={reminder.id} className="list-group-item">
						<div className="list-item">
						     <div>{reminder.text}</div>
						     <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
						</div>
						<div 
						className="list-item delete-button"
						//A () before => implies that the function is called without any parameters.
						// similar to function(){<do the steps>}
						onClick={() => this.deleteReminder(reminder.id)}>
						  &#x2715;
						</div>
						</li>
					)
			})				
	    }
		    </ul>
	    )
	}


	render() {
		console.log('this.props from mapStateToProps', this.state);
		return(
			<div className = "App">
				<div className = "App-title">
				   App
				</div>
				<div className = "form-inline reminder-form">
					<div className = "form-group">
						<input 
							className = "form-control"
							placeholder = "book "
							onChange={event => this.setState({text:event.target.value})}
						/>
					</div>
					<input
					  className="form-control"
					  type="datetime-local"
					  onChange={event => this.setState({dueDate:event.target.value})}
					/>
					<button
						type = "button"
						className = "btn btn-success"
						onClick = {() => this.addReminder()}
					>
					   Add	
					</button>
				</div>

					{this.renderReminders()}
			</div>
		)

	}
}

function mapStateToProps(state){
	return{
		reminders: state
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addReminder,deleteReminder}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
