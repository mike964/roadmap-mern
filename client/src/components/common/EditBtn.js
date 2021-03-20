import React from 'react'

// Transformable edit btn 
// Edit - Save - Cancel
const EditBtn = ( { children, isEditing, onClick, onSave, onlyIcon } ) => {
  return <span className="mx-22">
    { isEditing ? <>
      <span className=" clickable green" onClick={ onSave }> Save </span> { ' ' }
      <span className=" clickable crimson" onClick={ onClick } > Cancel </span>
    </>
      : <>
        { !onlyIcon && <span className="clickable" onClick={ onClick } > Edit </span> }
      </> }
    { ' ' }
    <span onClick={ onClick } className="pointer" > { children }</span>
  </span>
}

export default EditBtn

// onlyIcon : boolean : if show edit + icon or only icon 
// children : edit icon