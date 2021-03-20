import React, { Children } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'


const Hoverable = ( { place, children, hoverText } ) => {
  return <OverlayTrigger
    placement={ place ? place : 'top' }
    overlay={ <Tooltip id="tooltip-24" > { hoverText ? hoverText : 'Some hint' } </Tooltip> }
  >
    { children }
  </OverlayTrigger>
}


export default Hoverable

