import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useRouteMatch } from 'react-router-dom'
import { getProjectBySlug } from '../../redux/actions/project.actions'
import { getStepsofProject } from '../../redux/actions/step.actions'
import StepFilters from '../step/StepFilters'
import StepForm from '../step/NewStepForm'
import StepList from '../step/StepList'
import ProjectDetailsBox from './ProjectDetailsBox'
import ProductivityGraph from './ProductivityGraph'
import { Accordion, Tab, Tabs } from 'react-bootstrap'

const ProjectPg = () => {
  // when click on Project Link , shoud reload steps

  // The <Route> that rendered this component has a path of `/topics/:topicId`.
  // The `:topicId` portion of the URL indicates a placeholder that we can  get from `useParams()`.
  // let { projectId } = useParams()
  const projectSlug = useParams().slug
  // console.log( projectId )
  console.log(projectSlug)

  // const project = {}

  // const match = useRouteMatch()
  // console.log( match )   // undefined

  console.log('# ProjectPg Mounted.')

  const [selectedTabKey, setSelectedTabKey] = useState('details')

  const { currentProject: project, loading } = useSelector(
    (state) => state.project
  )
  const { steps } = useSelector((state) => state.step)

  useEffect(() => {
    // if ( match.params.projectId )
    // getProjectById(projectId)
    getProjectBySlug(projectSlug)
    // setSteps()
    // fetSteps()

    // setTimeout( () => { setShowStepList( true ) }, 2000 )
  }, [projectSlug])
  useEffect(() => {
    if (project._id) {
      getStepsofProject(project._id)
    }
    // setSteps()
    // fetSteps()
  }, [project])

  const completedSteps = steps.filter((item) => item.completed === true)
  const todos = steps.filter((item) => item.type === 'todo')
  const notes = steps.filter((item) => item.type === 'note')

  const StepListFooter = () => {
    return (
      <div className="p-1 center c-aaa">
        <span className="mr-2">Total : {steps.length}</span>
        <span className="mr-2">Todos: {todos.length}</span>
        <span className="mr-2">Notes : {notes.length}</span>
        <span className="mr-2">Completed : {completedSteps.length}</span>
      </div>
    )
  }
  //=============================================================
  return (
    <div className="page container p-0">
      <div className="center p-22">
        <h4 className="c-888">{project.name}</h4>
      </div>

      {/* If project exist */}
      <div className="bg-w my-3 p-3 border shadow-sm">
        <Tabs
          defaultActiveKey="details"
          id="project-tabls"
          activeKey={selectedTabKey}
          onSelect={(k) => setSelectedTabKey(k)}
        >
          <Tab eventKey="details" title="Details" tabClassName="c-444">
            <ProjectDetailsBox loading={loading} />
          </Tab>
          <Tab eventKey="graph" title="Graph" tabClassName="c-444">
            {selectedTabKey === 'graph' && <ProductivityGraph steps={steps} />}
          </Tab>
          <Tab eventKey="contact" title="Contact" tabClassName="c-444">
            <h4>Contact</h4>
          </Tab>
        </Tabs>
      </div>

      {/* Add New Step Form  */}
      <div className="bg-w my-3 border shadow-sm">
        <div className="step-form-box p-3 bg-w sticky-top">
          {/* Fix sticky step form later */}
          <div className="mb-3">
            <StepForm projectId={project ? project._id : ''} />
          </div>
          <StepFilters />
        </div>
        <StepList />
      </div>
      <StepListFooter />
    </div>
  )
}

export default ProjectPg
