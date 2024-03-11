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

import combineReducers from './reducer.js'
import {useSelector} from 'react-redux'

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
  console.log('inside selectAnswer', payload)
  return (dispatch) => {
    dispatch({
			type: SET_SELECTED_ANSWER,
			payload: {
				answer_id: payload
			},
		});
	};
}

export function setMessage() { }

const getUrl = 'http://localhost:9000/api/quiz/next';

const getQuiz = () => {
  return Axios.get(getUrl)
    .then( (res) => res.data )
    .catch( (err) => err.message )
}

export const resetQuiz = () => {
  return {
		type: INPUT_CHANGE,
	};
}

export function quizInfo (){
  console.log('getting quizInfo')
  return (dispatch) =>  {
    dispatch({
			type: 'get_quiz_info',
		});
  }
}

export function setQuizInfo (quiz_info) {
  return {
    type: 'set_quiz_info',
    payload: quiz_info,
  }
}

// just finished with get answer, make sure its working 

export function getAnswer () {
  console.log('getting answer')
  return {
		type: 'get_answer',
	};
}


export function createQuiz() {
			return (dispatch) => {
				return getQuiz()
					.then((quizData) => {
						dispatch({
							type: SET_QUIZ_INTO_STATE,
							payload: quizData,
						});
						return quizData;
					})
					.catch((err) => {});
			};
}



// check if quiz is in state

// if quiz is not in state initialize quiz

// if quiz is in state, return quiz state

// if user wants new quiz, initialize new quiz


// export function setQuiz() {
//   console.log('Setting Quiz')
// 		return (dispatch) => {
//       console.log('in dispatch')
// 			return getQuiz()
// 				.then((quizData) => {
//           console.log(quizData)
// 					dispatch({
// 						type: SET_QUIZ_INTO_STATE,
// 						payload: quizData,
// 					});
// 					return quizData;
// 				})
// 				.catch((err) => {});
// 		};
// }

  // const initialAnswer = {
	// 	text: '',
	// 	id: '',
	// };

	// const initialInfo = {
	// 	quiz_id: '',
	// 	answer_id: '',
	// };

export function nameHere() {
  
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

//   const answerURL = 'http://localhost:9000/api/quiz/answer';

// const getAnswer = () => {
//   let info = combineReducers.selectedAnswer
// 	return Axios.post(answerURL, info)
// 		.then((res) => res.data)
// 		.catch((err) => err.message);
// };

export function postAnswer(payload) {

  const answerURL = 'http://localhost:9000/api/quiz/answer';
  return function (dispatch) {
    // On successful POST:
      return Axios.post(answerURL, payload)
        .then( (res) => {
          dispatch({
						type: SET_INFO_MESSAGE,
						payload: res.data.message,
					});
          dispatch(resetQuiz());
          dispatch(createQuiz())
          return res.data.message
        })
        .catch( (err) => console.log(err.message) )
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

export function formData(payload) {
  return {
    type: 'form_data_change',
    payload: payload,
  }
}

export function grabFormData() {
  return {
    type: 'grab_form_data',
  }
}

export function updateForm (payload) {
  return {
		type: 'update_form',
    payload: {...payload},
	};
}


export function postForm() {
  const post = 'http://localhost:9000/api/quiz/new';

  return function (dispatch, getState) {
    const formData = getState().form

    
    return Axios.post(post, formData)
      .then( (res) => {
        let info = `Congrats: "${formData.question_text}" is a great question!`;

        dispatch( {
					type: SET_INFO_MESSAGE,
					payload: info,
				});

        dispatch({
					type: 'clear_form',
				});

      } )
      .catch( (err) => {
        console.log(err)
      } )
  }
}
