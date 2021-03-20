import React from 'react'
import { Form } from 'react-bootstrap'

const FormGrup = ( { label, name, value, onChange, type, textarea, rows } ) => {
  return <Form.Group>
    { label && <Form.Label> { label }</Form.Label> }
    <Form.Control
      name={ name }
      type={ type ? type : "text" }  // email
      // type="text"
      value={ value ? value : '' }
      onChange={ onChange }
      as={ textarea ? 'textarea' : 'input' }
      rows={ rows ? rows : 2 }
    />
  </Form.Group>
}

export default FormGrup
