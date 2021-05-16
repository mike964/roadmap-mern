import React from 'react'
import { Form } from 'react-bootstrap'

// Bootstrap switch works like check box
const Switch = ({ label, id, onChange, checked }) => {
  return (
    <Form.Check
      type="switch"
      name={id ? id : 'switch-name'}
      id={id ? id : 'switch-id-001'}
      label={label ? label : 'Label'}
      //onChange={ ( e ) => console.log( e.target.checked ) }
      onChange={onChange}
      checked={checked}
    />
  )
}

export default Switch
