import React from 'react'
import {
  toggleHidecompleted,
  toggleHideNotes,
} from '../../redux/actions/global.actions'
import Switch from '../common/Switch'

const StepFilters = () => {
  const handleHideNotes = (e) => {
    toggleHideNotes(e.target.checked)
  }
  const handleHideCompleted = (e) => {
    toggleHidecompleted(e.target.checked)
  }

  return (
    <div className="row">
      <div className="col">
        <Switch
          id="hide-notes-switch"
          label="Hide Notes"
          onChange={handleHideNotes}
        />
      </div>
      <div className="col">
        <Switch
          id="hide-completed-id"
          label="Hide Completed"
          //onChange={ ( e ) => console.log( e.target.checked ) }
          onChange={handleHideCompleted}
        />
      </div>
      <div className="col">
        <span>Sort by</span>
      </div>

      <div className="col-2">
        <select className="custom-select" defaultValue="frontend">
          {/* <option selected>Group</option> */}
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>
    </div>
  )
}

export default StepFilters
