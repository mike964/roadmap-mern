import React, { useState } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'
import moment from 'moment'
import StepsList from '../step/StepList'
import DownIcon from '../Icons/DownIcon'
import { getStepsofProject } from '../../redux/actions/step.actions'
import { useSelector } from 'react-redux'
import ProjectItemModal from './ProjectItemModal'
import { setCurrnetProject, deleteProject } from '../../redux/actions/project.actions'
import PencilSqr from '../Icons/PencilSqr'
import TrashIcon from '../Icons/TrashIcon'
import EditProjectModal from './EditProjectModal'
//==========================================================================

const ProjectItem = ( {
  project
} ) => {
  const { currentProject } = useSelector( state => state.project )
  const { steps } = useSelector( state => state.step )

  const [ checked, setChecked ] = useState( true )
  const handleChange = ( event ) => setChecked( event.target.checked )
  const [ modalShow, setModalShow ] = useState( false )
  const [ editModalShow, st_editModalShow ] = useState( false )
  const handleModalShow = () => setModalShow( !modalShow )
  const handleEditModalShow = () => st_editModalShow( !editModalShow )
  const [ accordionOpen, setAccordionOpen ] = useState( false )
  // const handleModalShow = () => setModalShow( !modalShow )

  const { startedAt, finishedAt, title, _id } = project

  const checkbox = () => { }

  const onProjectTitleClick = () => {
    setModalShow( false )
    setCurrnetProject( project )
    handleModalShow()
    getStepsofProject( _id )

  }

  const onProjectToggle = () => {
    // Don't show step loading when closing accordion 

    setAccordionOpen( !accordionOpen )
    setCurrnetProject( project )

    if ( !accordionOpen ) {
      setAccordionOpen( !accordionOpen )
      getStepsofProject( _id )
    }
  }

  const handleEdit = () => {
    setCurrnetProject( project )
    handleEditModalShow()
  }
  const handleDelete = () => {
    deleteProject( _id )
  }




  //======================================================================
  return <>
    <Card>
      <Card.Header className="row align-items-center">
        <div className="col-1">
          <Accordion.Toggle
            //as={ Button }
            style={ accordionToggleStyle }
            onClick={ onProjectToggle }
            eventKey={ _id }
          > <DownIcon />
          </Accordion.Toggle >
        </div>

        <div className="col-3" onClick={ onProjectTitleClick } >
          { title }
        </div>

        <div className="col-3">
          { startedAt ? moment( startedAt ).format( 'YYYY-MM-DD' ) : 'Not yet' }
        </div>

        <div className="col-3">
          { finishedAt ? moment( finishedAt ).format( 'YYYY-MM-DD' ) : 'Not yet' }
        </div>

        <div className="col-2 text-center">
          <span onClick={ handleEdit } className="clickable">
            <PencilSqr wh={ 1.4 } color="skyblue" />
          </span>
          <span onClick={ handleDelete } className="ml-1 clickable">
            <TrashIcon wh={ 1.4 } color="skyblue" />
          </span>
        </div>
      </Card.Header>

      <Accordion.Collapse eventKey={ _id }>
        <Card.Body>
          <StepsList
            //steps={ currentProjectSteps } 
            showInput={ false }
            putInsideDiv={ false }
            showChevrons={ false }
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>

    <ProjectItemModal
      show={ modalShow }
      handleModalShow={ handleModalShow }
      project={ project }
    />

    <EditProjectModal
      show={ editModalShow }
      handleModalShow={ handleEditModalShow }
    />
  </>
}

const accordionToggleStyle = {
  background: 'inherit',
  border: 'none',
  color: '#009be5',
  display: 'inlineBlock',
  // marginRight: '10px'
}

export default ProjectItem


