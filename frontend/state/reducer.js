// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers, } from 'redux'
import {
	MOVE_CLOCKWISE,
	MOVE_COUNTERCLOCKWISE,
	SET_QUIZ_INTO_STATE,
	SET_SELECTED_ANSWER,
	SET_INFO_MESSAGE,
	INPUT_CHANGE,
	RESET_FORM,
} from './action-types.js';

import { postAnswer, } from './action-creators.js';
import thunk from 'redux-thunk'

import Axios from 'axios';






const initialWheelState = 0
function wheel(state = initialWheelState, action) {

  const moveForward = () => {
		if (state + 1 <= 5) {
			return state + 1
		} else {
      return 0
    }
	};

  const moveBackward = () => {
		if (state - 1 >= 0) {
			return  state - 1;
		} else {
			return 5;
		}
	};

  const { type, payload } = action
  switch(type) {
    case MOVE_CLOCKWISE:
      return moveForward()
    case MOVE_COUNTERCLOCKWISE:
      return moveBackward()
    default:
      return state
  }
}

    let getUrl = 'http://localhost:9000/api/quiz/next';
  const getQuiz = () => {
		return Axios.get(getUrl)
			.then((res) => res.data )
			.catch((err) => console.log(err.message));
	};

const initialQuizState = null

// answers
// : 
// (2) [{…}, {…}]
// question
// : 
// "What is a closure?"
// quiz_id
// : 
// "lxpjs"


function quiz(state = initialQuizState, action) {

  switch (action.type) {
		case SET_QUIZ_INTO_STATE:
			return { ...state, ...action.payload };
		case INPUT_CHANGE:
			return null;
		case 'get_quiz_info':
      console.log('get_quiz_info in state', state)
			return state;
		case 'set_quiz_info':
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  console.log(action)
  switch (action.type) {
		case SET_SELECTED_ANSWER:
      console.log('inside reducer select Answer')
			return {
				quiz_id: action.payload.quiz_id,
				answer_id: action.payload.answer_id,
			};
		case 'get_answer':
			return state.answer_id;
		default:
			return state;
	}
  
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case SET_INFO_MESSAGE:
      return action.payload
    default:
      return state;
  }
  
}

const initialFormState = {
  question_text: '',
  true_answer_text: '',
  false_answer_text: '',
}
function form(state = initialFormState, action) {
  switch(action.type) {
    case 'form_data_change':
      return {
				...state,
				question_text: action.payload.question_text,
				true_answer_text: action.payload.true_answer_text,
				false_answer_text: action.payload.false_answer_text,
			};
    case 'grab_form_data':
      return state;
    case 'clear_form':
      return {
        ...initialFormState,
      }
    case 'update_form':
      return {
        ...state,
        ...action.payload,
      }
  }
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })


