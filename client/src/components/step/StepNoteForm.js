import React, { useState } from 'react'
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap'
import { addStepNote_DB } from '../../redux/actions/step.actions'

const StepNoteForm = ({ stepId }) => {
  const [note, setNote] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addStepNote_DB(stepId, note)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Notes
        </Form.Label>
        <Col sm="10">
          <InputGroup as={Row} className="mb-3 w-100">
            <FormControl
              placeholder="New Note"
              //  aria-label="New note-substep"
              // aria-describedby="basic-addon2"
              //id={stepId}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <InputGroup.Append>
              <Button type="submit"> + </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default StepNoteForm
