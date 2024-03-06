// ❗ You don't need to add extra action creators to achieve MVP
import {
	MOVE_CLOCKWISE,
	MOVE_COUNTERCLOCKWISE,
	SET_QUIZ_INTO_STATE,
	SET_SELECTED_ANSWER,
	SET_INFO_MESSAGE,
	INPUT_CHANGE,
	RESET_FORM,
} from './action-types.js';

import Axios from 'axios'






export function moveClockwise() { 
  return {
    type: MOVE_CLOCKWISE,
  }

}

export function moveCounterClockwise() { 
  return {
		type: MOVE_COUNTERCLOCKWISE,
	};
}

export function selectAnswer(payload) { 
  return {
		type: SET_SELECTED_ANSWER,
		payload: payload,
	};
}

export function setMessage() { }

const getUrl = 'http://localhost:9000/api/quiz/next';

const getQuiz = () => {
  return Axios.get(getUrl)
    .then( (res) => res.data )
    .catch( (err) => err.message )
}

export function setQuiz() {
  return (dispatch) => {
    return getQuiz()
      .then( (quizData) => {
        dispatch({
          type: SET_QUIZ_INTO_STATE,
          payload: quizData,
        });
        return quizData;
      })
      .catch( (err) => {
        console.log(err.message)
      })
  }
}

export function inputChange() { }

export function resetForm() { }



// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}

const answerURL = 'http://localhost:9000/api/quiz/answer';

export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
      Axios.post(answerURL)
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
