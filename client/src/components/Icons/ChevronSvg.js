import React from 'react'

const ChevronSvg = ( {
  direction,
  wh,
  color,
  bgColor,
} ) => {


  let classs
  if ( direction === 'up' ) {
    classs = "bi bi-chevron-up chevron"
  }
  if ( direction === 'down' ) {
    classs = "bi bi-chevron-down chevron"
  }


  // Styling 
  // const style = {
  //   // background: 'black'   // works 
  // }

  return <svg
    className={ classs }
    fill={ color }
    width={ `${ wh }em` }
    height={ `${ wh }em` }
    //style={ style }
    // fontWeight="900"   doesn't work
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    { direction === 'up' ?
      <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" />
      : <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
    }
  </svg>

}



export default ChevronSvg
