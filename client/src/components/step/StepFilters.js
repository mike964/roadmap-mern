import React from 'react'
import { Form } from 'react-bootstrap'
import { toggleHidecompleted, toggleHideNotes } from '../../redux/actions/global.actions'

const StepFilters = () => {



  const handleHideNotes = ( e ) => {
    toggleHideNotes( e.target.checked )
  }
  const handleHideCompleted = ( e ) => {
    toggleHidecompleted( e.target.checked )
  }


  return <div className="row my-3">
    <div className="col">
      <Form.Check
        type="switch"
        name='hideNotes'
        id="hide-notes-switch"
        label="Hide Notes"
        //onChange={ ( e ) => console.log( e.target.checked ) }
        onChange={ handleHideNotes }
      />
    </div>

    <div className="col">
      <Form.Check
        type="switch"
        name='hideCompleted'
        id="hide-completed-switch"
        label="Hide Completed"
        //onChange={ ( e ) => console.log( e.target.checked ) }
        onChange={ handleHideCompleted }
      />

    </div>
    <div className="col">
      <span>Sort by</span>
    </div>

    <div className="col-2">
      <select className="custom-select" defaultValue='frontend'>
        {/* <option selected>Group</option> */ }
        <option value='frontend'>Frontend</option>
        <option value='backend'>Backend</option>
      </select>
    </div>
  </div>
}

export default StepFilters
