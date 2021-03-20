import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Chart from "chart.js";


const ProductivityGraph = ( { steps } ) => {

  const [ lastTenDays, setLastTenDays ] = useState( [] )  // last 14 days
  const [ graphLabels, setGraphLabels ] = useState( [] )



  // console.log( '# ProductivityGraph mounted.' )

  const getLastTenDays = () => {
    let days = []
    let labels = []
    const today = moment().format( 'YYYY-MM-DD' )
    const yesterday = moment().subtract( 1, 'd' ).format( 'YYYY-MM-DD' )   // 2021-03-16
    // const yesterdayMinus10 = moment().subtract( 10, 'd' ).format( 'YYYY-MM-DD' )   // 2021-03-16
    const yesterdayMinus14 = moment().subtract( 14, 'd' ).format( 'YYYY-MM-DD' )   // 2021-03-16

    // console.log( yesterday )

    for ( let i = 0; i < 14; i++ ) {
      let x = moment( yesterdayMinus14 ).add( i + 1, 'd' ).format( 'YYYY-MM-DD' )
      let label = moment( yesterdayMinus14 ).add( i + 1, 'd' ).format( 'MMM DD' )
      days[ i ] = x
      labels[ i ] = label
    }
    // console.log( days )
    setLastTenDays( days )
    setGraphLabels( labels )
  }



  useEffect( () => {
    // const lastTenDays = getLastTenDays()
    getLastTenDays()

  }, [] )

  useEffect( () => {
    // * Chart JS
    if ( lastTenDays.length, steps.length ) {
      const completedStepsPerDay =
        lastTenDays.map( item => {
          const completedSteps = steps.filter( step => step.finished === true && moment( step.finishedAt ).format( "YYYY-MM-DD" ) === item )
          const nCompletedSteps = completedSteps.length
          return nCompletedSteps
        } )

      // console.log( steps )
      // console.log( completedStepsPerDay )

      var ctx = document.getElementById( 'myChart' ).getContext( '2d' );
      var myChart = new Chart( ctx, {
        type: 'bar',
        data: {
          // labels: [ 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange' ],
          // labels: lastTenDays,
          labels: graphLabels,
          datasets: [ {
            label: 'Completed todos',
            // data: [ 12, 19, 3, 5, 2, 3 ],
            data: completedStepsPerDay,
            backgroundColor: 'rgba(0, 162, 255, 0.637)',
            borderWidth: 1,
            borderColor: 'rgb(0, 48, 206)'
          } ]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [ {
              ticks: {
                stepSize: 1
              }
            } ]
          }
        }
      } );
    }
  }, [ lastTenDays, steps ] )


  //=====================================================================
  return <div className="p-3">
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h5>Productivity Graph </h5>
      <div className="btn-toolbar mb-2 mb-md-0">
        <div className="btn-group mr-2">
          <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
          <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
        </div>
        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width={ 24 } height={ 24 } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ 2 } strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x={ 3 } y={ 4 } width={ 18 } height={ 18 } rx={ 2 } ry={ 2 } /><line x1={ 16 } y1={ 2 } x2={ 16 } y2={ 6 } /><line x1={ 8 } y1={ 2 } x2={ 8 } y2={ 6 } /><line x1={ 3 } y1={ 10 } x2={ 21 } y2={ 10 } /></svg>
      This week
    </button>
      </div>
    </div>

    <div className="p-3"  >
      <canvas id="myChart" height="100" />
    </div>
  </div>
}

export default ProductivityGraph
