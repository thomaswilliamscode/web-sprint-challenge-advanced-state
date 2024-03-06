import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	MOVE_CLOCKWISE,
	MOVE_COUNTERCLOCKWISE,
	SET_QUIZ_INTO_STATE,
	SET_SELECTED_ANSWER,
	SET_INFO_MESSAGE,
	INPUT_CHANGE,
	RESET_FORM,
} from '../state/action-types';

import {
	moveClockwise,
	moveCounterClockwise,
	selectAnswer,
	setMessage,
	setQuiz,
	inputChange,
	resetForm,
	fetchQuiz,
	postAnswer,
	postQuiz,
} from '../state/action-creators.js';



export default function Wheel(props) {

  const dispatch = useDispatch()
  const div = useSelector( (state) => state.wheel)


  const handleClockwise = () => {
    dispatch(moveClockwise())
  }

  const handleCounterClockwise = () => {
    dispatch(moveCounterClockwise())
  }


  const divMaker = () => {
    let elements = []
    for (let i = 0; i <= 5; i++) {
      if ( i === div) {
        elements.push(
					<div className='cog active' key={i} style={{ '--i': `${i}` }}>
						B
					</div>
				);
      } else {
        elements.push(
					<div className='cog' key={i} style={{ '--i': `${i}` }}></div>
				);
      }
    }

    return elements
  }




  return (
		<div id='wrapper'>
			<div id='wheel'>
				{divMaker()}
				{/* --i is a custom CSS property, no need to touch that nor the style object */}
			</div>
			<div id='keypad'>
				<button id='counterClockwiseBtn' onClick ={handleCounterClockwise}>Counter clockwise</button>
				<button id='clockwiseBtn' onClick={handleClockwise}>
					Clockwise
				</button>
			</div>
		</div>
	);
}
