import React from 'react'

const FinishedStepsToggle = ( {
  label
} ) => {

  return <div className="custom-control custom-switch">
    <input type="checkbox"
      className="custom-control-input"
      id="customSwitch1" />
    <label className="custom-control-label"
      htmlFor="customSwitch1"
    >{ label }</label>
  </div>
}

export default FinishedStepsToggle
