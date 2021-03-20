import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'


const SucssFailSpinr = ( { status, children } ) => {
  // status is req status //   ['spinr', 'success' , 'fail']
  // If req.start => Show spinner
  // If req success => Show Done
  // If Req fails => Show Red x  

  const stylee = {
    fontFamily: "Arial",
    //padding: "6px",
    // fontSize: '1.2rem',
    // fontSize: '1rem',
    fontWeight: '500'
    //backgroundColor: "white",
  }

  return <span style={ stylee } >
    { status === 'spinner'
      && <Spinner as="span" animation="border" variant="warning" size="sm" /> }
    { status === 'success'
      && <span className='green bg-w px-1' >&#10004;</span> }
    { status === 'fail'
      && <span className='red bg-w  px-1'>&#10006;</span> }
    { ( !status || status === 'default' ) && <>{ children }</> }
  </span>
}


export default SucssFailSpinr

