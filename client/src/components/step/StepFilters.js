import React from 'react'
import {
  setStepSearch,
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
      <div className="col text-center">
        <input
          type="text"
          className="step-filter-input"
          placeholder="Find a step..."
          onChange={(e) => setStepSearch(e.target.value)}
        />
      </div>
      <div className="col p-2 text-center">
        <Switch
          id="hide-notes-switch"
          label="Hide Notes"
          onChange={handleHideNotes}
        />
      </div>
      <div className="col p-2 text-center">
        <Switch
          id="hide-completed-id"
          label="Hide Completed"
          //onChange={ ( e ) => console.log( e.target.checked ) }
          onChange={handleHideCompleted}
        />
      </div>
      <div className="col">
        <select className="custom-select" defaultValue="frontend">
          <option selected>Sort by</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>
    </div>
  )
}

export default StepFilters
