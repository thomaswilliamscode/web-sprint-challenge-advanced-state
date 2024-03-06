import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

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

export default function Quiz(props) {
	const dispatch = useDispatch();

  const initialAnswer = {
    text: '',
    id: '',
  }

  const initialInfo = {
    quiz_id: '',
    answer_id: ''
  }

	const quiz = useSelector((state) => state.quiz);
	const [ answer1, setAnswer1 ] = useState(initialAnswer);
	const [answer2, setAnswer2] = useState(initialAnswer);
  const [info, setInfo] = useState(initialInfo)
  const [submit, setSubmit] = useState(true)

  // if submit === false, submit button disabled



  // if selected, add class selected

useEffect(() => {
    console.log('useEffect triggered');
		console.log(quiz);
	if (quiz && quiz.answers && quiz.answers.length >= 2) {
		setAnswer1({
			...answer1,
			text: quiz.answers[0].text,
			id: quiz.answers[0].answer_id,
		});
		setAnswer2({
			...answer2,
			text: quiz.answers[1].text,
			id: quiz.answers[1].answer_id,
		});

    setInfo({
      ...info,
      quiz_id: quiz.quiz_id,
    })
	}
}, [quiz, setAnswer1, setAnswer2]);

	useEffect(() => {
		dispatch(setQuiz());
	}, [dispatch]);

const onSelect = (e) => {
  let id = e.target.id;
  setInfo({
    ...info,
    answer_id: id,
  })
  setSubmit(false)

}

const onSubmit = () => {
  console.log(info)
  dispatch(selectAnswer(info));
}




	return (
		<div id='wrapper'>
			{quiz ? (
				<>
					<h2>{quiz.question}</h2>

					<div id='quizAnswers'>
						{answer1 && (
							<div
								className={`answer ${
									info.answer_id === answer1.id ? 'selected' : ''
								}`}
							>
								{answer1.text}
								<button id={answer1.id} onClick={onSelect}>
									{`${info.answer_id === answer1.id ? 'Selected' : 'Select'}`}
								</button>
							</div>
						)}

						{answer2 && (
							<div
								className={`answer ${
									info.answer_id === answer2.id ? 'selected' : ''
								}`}
							>
								{answer2.text}
								<button id={answer2.id} onClick={onSelect}>
									{`${info.answer_id === answer2.id ? 'Selected' : 'Select'}`}
								</button>
							</div>
						)}
					</div>

					<button disabled = {submit}
            id='submitAnswerBtn' onClick={onSubmit}>
						Submit answer
					</button>
				</>
			) : (
				'Loading next quiz...'
			)}
		</div>
	);
}