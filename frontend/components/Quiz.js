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
	quizInfo,
	createQuiz,
	resetQuiz,
	getAnswer,
	setQuizInfo,
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
  const [response, setResponse] = useState('')

  // if submit === false, submit button disabled

//   const quizInfo = {
// 	type: 'quiz_info',
// 	payload: quiz,
//   }



  // if selected, add class selected

useEffect(() => {
	if (quiz && quiz.answers && quiz.answers.length >= 2) {
		console.log('quiz Info in component useEffect', quiz.quiz_id);
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

const answer = useSelector((state) => state.selectedAnswer);

const reducerQuiz = useSelector( (state) => state.quiz )


	useEffect(() => {
		dispatch(quizInfo());
		if (!quiz) {
			dispatch(createQuiz())
		} else if (answer && answer.answer_id && quiz) {
			setInfo({
				...info,
				answer_id: answer.answer_id,
				quiz_id: quiz.quiz_id,
			});
			setSubmit(false);
		}
	}, [dispatch]);

const onSelect = (e) => {
  let id = e.target.id;
  console.log('onSelect', id)
  console.log('reducer Quiz', reducerQuiz);
  setInfo({
    ...info,
    answer_id: id,
  })
  setSubmit(false)
  dispatch(selectAnswer(id)); 
}

const onSubmit = () => {
	console.log('onSubmit', info)
  dispatch(setQuizInfo(info));

  dispatch(postAnswer(info))
    .then((res)=> {
      setResponse(res)
      
    })

  setSubmit(true);


  
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
									{`${info.answer_id === answer1.id ? 'SELECTED' : 'Select'}`}
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
									{`${info.answer_id === answer2.id ? 'SELECTED' : 'Select'}`}
								</button>
							</div>
						)}
					</div>

					<button disabled={submit} id='submitAnswerBtn' onClick={onSubmit}>
						Submit answer
					</button>
				</>
			) : (
				'Loading next quiz...'
			)}
		</div>
	);
}