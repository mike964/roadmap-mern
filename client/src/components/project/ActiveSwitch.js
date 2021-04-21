import React from 'react'
import { Form } from 'react-bootstrap'
import { updateProject_DB } from '../../redux/actions/project.actions'

// Project Active Switch
const ActiveSwitch = ({ project }) => {
  const handleSwitch = async (e) => {
    console.log(e.target.checked)
    const success = await updateProject_DB(project._id, {
      active: e.target.checked,
    })
  }

  return (
    <Form.Check
      type="switch"
      name="active"
      id="hide-notes-switch"
      label="Active"
      //onChange={ ( e ) => console.log( e.target.checked ) }
      onChange={handleSwitch}
      checked={project.active}
    />
  )
}

export default ActiveSwitch
