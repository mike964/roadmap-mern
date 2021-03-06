import React from 'react'

const XIcon = ( {
  wh,   // width and height
  color,
} ) => {

  return <svg
    fill={ color }
    className="btn-x"
    width={ `${ wh }em` }
    height={ `${ wh }em` }
    viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.854 4.854a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clipRule="evenodd" />
  </svg>

}

export default XIcon

