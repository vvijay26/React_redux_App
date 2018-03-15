import { ADD_REMINDER,DELETE_REMINDER } from '../constants';
import {bake_cookie, read_cookie } from 'sfcookies';

const reminder = (action) => {
	let {text, dueDate} = action;
	return {
		id: Math.random(),
		text,
		dueDate
	}
}

const removeById = (state = [], id) => {
	const reminders = state.filter(reminder => reminder.id !== id);
	console.log('new reduced reminders');
	return reminders;
}

const reminders = (state = [], action) => {
	let reminders = null;
	state = read_cookie('reminders');
	switch(action.type){
		case ADD_REMINDER:
		    //The three dots (...) is a spread function of ES6 wich "Spreads" an array into different arguments
		    //Example:- 
		    //function sum(x, y, z) {
            //return x + y + z;
            //}
            //const numbers = [1, 2, 3];
            //console.log(sum(...numbers));
		    reminders = [...state, reminder(action)]
			bake_cookie('reminders',reminders);
			return reminders;
		case DELETE_REMINDER:
			console.log('about to call delete reminder function from reducer');
			reminders = removeById(state,action.id);
			bake_cookie('reminders',reminders);
			return reminders;
		default:
			return state;
	}
}

export default reminders;