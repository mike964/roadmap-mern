import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { addStep_DB } from '../../redux/actions/step.actions'
import SucssFailSpinr from '../common/SucssFailSpinr'

// ** Add / edit step form
const NewStepForm = ({ projectId, userId }) => {
  const [state, setState] = useState({
    name: '', // step.name
    type: 'todo', // step.type
  })

  const [reqStatus, setReqStatus] = useState('')
  // * request state to backend in order to show success check

  const handleInputChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log( step )  // good
    setReqStatus('spinner')
    const newStep = {
      project: projectId,
      ...state,
    }

    console.log(newStep)
    const success = await addStep_DB(newStep)
    console.log(success)
    setReqStatus(success ? 'success' : 'fail')
    setTimeout(() => setReqStatus('default'), 2000) // Set back to default

    if (success) setState({ name: '', type: 'todo' }) // * Clear input filed after submit
  }

  //======================================================
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          name="name"
          type="text"
          className="form-control "
          placeholder="New Step"
          onChange={handleInputChange}
          value={state.name}
          style={{ width: '70%' }}
        />

        <Form.Control
          as="select"
          name="type"
          value={state.type}
          onChange={handleInputChange}
        >
          <option value="todo"> Todo </option>
          <option value="note"> Note </option>
        </Form.Control>

        <div className="input-group-append">
          <button className="btn btn-success" type="submit">
            <SucssFailSpinr status={reqStatus}> + </SucssFailSpinr>
          </button>
        </div>
      </div>
    </form>
  )
}

export default NewStepForm

// <i className="far fa-check-square" />
// <i className="far fa-sticky-note" />
