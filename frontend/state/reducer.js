// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers, } from 'redux'
import { MOVE_CLOCKWISE, } from './action-types.js'



const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  const { type, payload } = action
  switch(type) {
    case MOVE_CLOCKWISE:
      console.log('clockwise')
      // return the state + 1
      return state
    default:
      return state
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })


