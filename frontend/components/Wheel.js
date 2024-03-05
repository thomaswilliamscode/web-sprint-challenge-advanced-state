import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MOVE_CLOCKWISE } from '../state/action-types';
import { moveClockwise } from '../state/action-creators.js';



export default function Wheel(props) {
  const dispatch = useDispatch()

  const handleClockwise = () => {
    dispatch(moveClockwise())
  }




  return (
		<div id='wrapper'>
			<div id='wheel'>
				<div className='cog active' style={{ '--i': 0 }}>
					B
				</div>
				<div className='cog' style={{ '--i': 1 }}></div>
				<div className='cog' style={{ '--i': 2 }}></div>
				<div className='cog' style={{ '--i': 3 }}></div>
				<div className='cog' style={{ '--i': 4 }}></div>
				<div className='cog' style={{ '--i': 5 }}></div>
				{/* --i is a custom CSS property, no need to touch that nor the style object */}
			</div>
			<div id='keypad'>
				<button id='counterClockwiseBtn'>Counter clockwise</button>
				<button id='clockwiseBtn' onClick={handleClockwise}>
					Clockwise
				</button>
			</div>
		</div>
	);
}
