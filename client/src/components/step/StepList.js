import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import StepItem from './StepItem'
// import StepItemNote from './StepItemNote'
// import FinishedStepsToggle from './FinishedStepsToggle' 
import { Accordion, Spinner } from 'react-bootstrap'
import { getStepsofProject } from '../../redux/actions/step.actions';
import Hoverable from '../common/Hoverable';


//======================================================================================
const StepList = () => {
  console.log( '# StepList Mounted.' )
  // const { currentUser } = useSelector( state => state.auth )
  // const { currentProject } = useSelector( state => state.project )
  const { steps, loading: stepLoading } = useSelector( state => state.step )
  // const stepLoading = useSelector( state => state.step.loading )

  // const [ loading, setLoading ] = useState( true ) 
  // const steps = [] 


  // console.log( steps )


  const StepListHeader = () => {
    return <div className="steplist_header row p-2 em-09 center" >
      <div className="col-8">
        <Hoverable hoverText={ `Total: ${ steps.length }` }>
          <span className="mr-3">Steps ({ steps.length })</span>
        </Hoverable>
      </div>
      {/* <div className="col"> Added at </div> */ }
      {/* <div className="col"> Started at </div> */ }
      <div className="col"> Completed </div>
      <div className="col-1"></div>
    </div>
  }

  const SpinrBox = () => {
    return <div className="p-5 text-center">
      <Spinner animation="border" variant="warning" />
    </div>
  }

  // =====================================================================
  return <div className="step-list">
    <StepListHeader />
    { stepLoading ? <>
      <SpinrBox />
    </>
      : <>
        { steps.length ? <>
          { steps.map( ( step, index ) => <StepItem step={ step } key={ step._id } />
          ) }
        </>
          : <div className="text-center pt-2"> No steps for this project yet</div>
        } </>
    }

  </div>
}
export default StepList
// <StepItem step={ step } key={ step._id } showChevrons={ showChevrons } />
// <p className="x" key={ step._id }>{ step._id }</p> 

// { loading ? <div className="p-5 center">
// <Spinner animation="border" variant="warning" />
// </div> : <>
//   { steps.length ? <>
//     { steps.map( ( step, index ) =>
//       <StepItem step={ step } key={ step._id }  /> ) }
//   </>
//     : <div className="text-center pt-2"> No steps for this project yet</div>
//   }
// </>
// }