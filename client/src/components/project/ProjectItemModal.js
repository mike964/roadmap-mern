import React, { useState, useEffect } from 'react'
import moment from 'moment'
import cx from "classnames";
import { Button, Modal, Accordion } from 'react-bootstrap';
import StepList from '../step/StepList'
import { useSelector } from 'react-redux';
import ProjectItem from './ProjectItem'
import StepItem from '../step/StepItem';
import StepsList from '../step/StepList';
import SortBox from '../common/SortBox';

//=====================================================================================
const ProjectItemModal = ( {
  show,
  handleModalShow,
  project
} ) => {
  const { currentProjectSteps } = useSelector( state => state.step )
  const { currentProject } = useSelector( state => state.project )
  const { steps } = useSelector( state => state.step )
  const [ descMin, st_descMin ] = useState( true )   // description div min size

  const getDate = ( miliseconds ) => moment( miliseconds ).format( 'YYYY-MMM-DD' )



  // const [ show, setShow ] = useState( false )
  // const handleShow = () => setShow( !show )
  // const handleClose = () => setShow( !show )

  const { title, description, createdAt, startedAt, finishedAt, _id } = project
  //==========================================================================================
  return <>
    <Modal show={ show } onHide={ handleModalShow } >
      <Modal.Header closeButton>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="project-details mb-3">
          <div className="row">
            <span className="font-700">&#9656; Project title:</span>
            <span className="ml-2">{ title }</span>
          </div>
          <div
            className={ cx( "row clickable", descMin && "desc-min", !descMin && "desc-max" ) }
            onClick={ () => st_descMin( !descMin ) }
          > <span className="font-700">&#9656; Description: </span>
            <span className="ml-2"> { description }</span>
          </div>
          <div className="row">
            <span className="font-700"> &#9656; Date Added :</span>
            <span className="ml-2">
              { createdAt ? getDate( createdAt ) : "Not yet" }
            </span>
          </div>
          <div className="row">
            <span className="font-700"> &#9656; Date started: </span>
            <span className="ml-2">
              { startedAt ? getDate( startedAt ) : "Not yet" }
            </span>
          </div>
          <div className="row">
            <span className="font-700"> &#9656; Date finished : </span>
            <span className="ml-2">
              { finishedAt ? getDate( finishedAt ) : "Not yet" }
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-8"></div>
          <div className="col-4 mb-2">
            <SortBox />
          </div>
        </div>


        <StepsList
          showInput={ true }
          showChevrons={ true }
          putInsideBox={ true }
        />

      </Modal.Body>
    </Modal>
  </>
}

export default ProjectItemModal

