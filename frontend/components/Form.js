import React, {useState, useEffect}  from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const dispatch = useDispatch()
  const storeForm = useSelector( (state) => state.form )


  const [disabled, setDisabled] = useState(true)


  useEffect( () => {
    findValues()
  }, [storeForm])

  const findValues = () => {
    if (storeForm.question_text && storeForm.true_answer_text && storeForm.false_answer_text) {
			setDisabled(false)
		} else {
      setDisabled(true)
    }
  }

  const onChange = evt => {
    const {id, value} = evt.target
    switch (id) {
			case 'newQuestion':
        dispatch(
					actionCreators.updateForm({
						question_text: value,
					})
				)
				break;

			case 'newTrueAnswer':
        dispatch(
					actionCreators.updateForm({
						true_answer_text: value,
					})
				);
				break;

			case 'newFalseAnswer':
        dispatch(
					actionCreators.updateForm({
						false_answer_text: value,
					})
				);
        break

			default:
				console.log('in Default');
				break;
		}
  }

  const onSubmit = evt => {
    evt.preventDefault();
    dispatch(actionCreators.formData(storeForm))
    dispatch(actionCreators.postForm());


  }

  return (
		<form id='form' onSubmit={onSubmit}>
			<h2>Create New Quiz</h2>
			<input
				maxLength={50}
				onChange={onChange}
				id='newQuestion'
				placeholder='Enter question'
				value={storeForm.question_text || ''}
			/>
			<input
				maxLength={50}
				onChange={onChange}
				id='newTrueAnswer'
				placeholder='Enter true answer'
				value={storeForm.true_answer_text || ''}
			/>
			<input
				maxLength={50}
				onChange={onChange}
				id='newFalseAnswer'
				placeholder='Enter false answer'
				value={storeForm.false_answer_text || ''}
			/>
			<button id='submitNewQuizBtn' disabled={disabled}>
				Submit new quiz
			</button>
		</form>
	);
}

export default connect(st => st, actionCreators)(Form)
