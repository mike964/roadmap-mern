import React from 'react'
import { Spinner } from 'react-bootstrap'

const Spinnerr = () => {
  return (
    <div style={ style } className="mt-5" >
      {/* <Spinner animation="border" variant="success" className="mr-1" />
      <Spinner animation="border" variant="warning" className="mr-1" />
      <Spinner animation="border" variant="info" className="mr-1" /> */}
      <br />
      <Spinner animation="grow" variant="success" className="mr-1" />
      <Spinner animation="grow" variant="warning" className="mr-1" />
      <Spinner animation="grow" variant="danger" className="mr-1" />
      <Spinner animation="grow" variant="info" className="mr-1" />
    </div>
  )
}

const style = {
  textAlign: 'center'
}

export default Spinnerr