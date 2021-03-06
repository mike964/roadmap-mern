import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Accordion, Card, Form, ProgressBar } from 'react-bootstrap'
import { updateProject_DB } from '../../redux/actions/project.actions'
import FormGrup from '../common/FormGrup'
import EditBtn from '../common/EditBtn'
import SucssFailSpinr from '../common/SucssFailSpinr'
import SpinrBox from '../common/SpinrBox'
import CompletionBar from './CompletionBar'
import { useSelector } from 'react-redux'
import Switch from '../common/Switch'

const ProjectDetailsBox = () => {
  const { currentProject: project, loading } = useSelector(
    (state) => state.project
  )
  const [state, setState] = useState({
    // ** Project
    // name: '',
    // description: ''
    // goals
    // notes,
    // createdAt
  })

  const created_at = moment(project.createdAt).format('MMMM Do YYYY, hh:mm')

  const [isEditing, setIsEditing] = useState(false)
  const [expanded, setExpanded] = useState(false) // if details box is expanded

  const handleInputChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setState({ ...state, [e.target.name]: value })
  }

  const onEditClick = () => {
    setState({ ...project })
    setIsEditing(!isEditing)
    // if ( !expanded ) setExpanded( true )
  }

  const [reqStatus, setReqStatus] = useState('')
  // * request state to backend in order to show check when update project success

  const handleUpdateProject = async () => {
    // * when click save
    console.log(state)
    setReqStatus('spinner')
    const success = await updateProject_DB(state._id, {
      name: state.name,
      description: state.description,
      goals: state.goals,
      features: state.features,
      notes: state.notes,
      createdAt: state.createdAt,
      // ...state  // fix here
    })
    setReqStatus(success ? 'success' : 'fail')
    setTimeout(() => setReqStatus(''), 3000) // Set back to default
    if (success) setIsEditing(false)
  }

  const FormLabel = ({ children }) => {
    return <div className="p-2 mb-3 bold"> {children} </div>
  }

  const StringToList = ({ string }) => {
    return (
      <ul>
        {' '}
        {string &&
          string.split('/').map((item, index) => (
            <li className="x" key={index}>
              {' '}
              {item}{' '}
            </li>
          ))}
      </ul>
    )
  }

  const handleActiveProjectSwitch = async (e) => {
    console.log(e.target.checked)
    const success = await updateProject_DB(project._id, {
      active: e.target.checked,
    })
  }

  //================================================================================================
  return (
    <Accordion>
      {loading ? (
        <SpinrBox />
      ) : (
        <div className="py-3">
          <div className="row">
            <div className="col-2">
              <FormLabel> Name </FormLabel>
            </div>
            <div className="col">
              {isEditing ? (
                <FormGrup
                  name="name"
                  value={state.name}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="p-2"> {project.name} </div>
              )}
            </div>
            {!isEditing && (
              <>
                <div className="col">
                  <CompletionBar />
                </div>
                <div className="col-auto px-3 pt-1">
                  {/* <ActiveSwitch project={project} /> */}
                  <Switch
                    label="Active"
                    id="active-project"
                    onChange={handleActiveProjectSwitch}
                    checked={project.active}
                  />
                </div>
              </>
            )}
            <div className="col text-right c-666">
              <SucssFailSpinr status={reqStatus} />
              <EditBtn
                onClick={onEditClick}
                isEditing={isEditing}
                onSave={handleUpdateProject}
              >
                <i className="fas fa-edit pointer" />
              </EditBtn>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <FormLabel> Created </FormLabel>
            </div>
            <div className="col">
              {isEditing ? (
                <FormGrup
                  name="createdAt"
                  value={state.createdAt}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="p-2 mb-3"> {created_at} </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <FormLabel> Describtion </FormLabel>
            </div>
            <div className="col">
              {isEditing ? (
                <FormGrup
                  name="description"
                  value={state.description}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="p-2"> {project.description} </div>
              )}
            </div>
          </div>
          <div className="row">
            {isEditing && <p className="em-09 c-888"> * split by / </p>}
          </div>
          <Accordion.Collapse eventKey="0">
            <div className="x">
              <div
                className="row mb-3"
                style={{
                  maxHeight: !expanded ? '75px' : '',
                  overflow: 'hidden',
                }}
              >
                <div className="col-2">
                  <FormLabel> Goals </FormLabel>
                </div>
                <div className="col">
                  {isEditing ? (
                    <FormGrup
                      name="goals"
                      value={state.goals}
                      onChange={handleInputChange}
                      textarea
                    />
                  ) : (
                    <StringToList string={project.goals} />
                  )}
                </div>
              </div>

              <div
                className="row mb-3"
                style={{
                  maxHeight: !expanded ? '75px' : '',
                  overflow: 'hidden',
                }}
              >
                <div className="col-2">
                  <FormLabel> Features </FormLabel>
                </div>
                <div className="col">
                  {isEditing ? (
                    <FormGrup
                      name="features"
                      value={state.features}
                      onChange={handleInputChange}
                      textarea
                    />
                  ) : (
                    <StringToList string={project.features} />
                  )}
                </div>
              </div>

              <div
                className="row"
                style={{
                  maxHeight: !expanded ? '75px' : '',
                  overflow: 'hidden',
                }}
              >
                <div className="col-2">
                  <FormLabel> Notes </FormLabel>
                </div>
                <div className="col">
                  {isEditing ? (
                    <FormGrup
                      name="notes"
                      value={state.notes}
                      onChange={handleInputChange}
                      textarea
                    />
                  ) : (
                    <StringToList string={project.notes} />
                  )}
                </div>
              </div>
            </div>
          </Accordion.Collapse>
        </div>
      )}
      <Accordion.Toggle as={'span'} eventKey="0">
        <div className="center" style={{ color: '#6495ED' }}>
          <span
            className="clickable mr-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Shrink' : 'Expand'}{' '}
            <i className={`fas fa-chevron-${expanded ? 'up' : 'down'}`} />
          </span>
        </div>
      </Accordion.Toggle>{' '}
    </Accordion>
  )
}

export default ProjectDetailsBox
