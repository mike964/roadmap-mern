import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
// import { steps as steps_ } from '../../utils/_data';
import { getProjectById } from '../../redux/actions/project.actions';
import { getStepsofProject } from '../../redux/actions/step.actions';
import StepFilters from '../step/StepFilters';
import StepForm from '../step/NewStepForm';
import StepList from '../step/StepList';
import ProjectDetailsBox from './ProjectDetailsBox';
import ProductivityGraph from './ProductivityGraph';
import { Accordion, Tab, Tabs } from 'react-bootstrap';

const ProjectPg = () => {
  // when click on Project Link , shoud reload steps

  // The <Route> that rendered this component has a path of `/topics/:topicId`. 
  // The `:topicId` portion of the URL indicates a placeholder that we can  get from `useParams()`.
  let { projectId } = useParams()
  // console.log( projectId )

  // const project = {}

  // const match = useRouteMatch()
  // console.log( match )   // undefined


  console.log( '# ProjectPg Mounted.' )

  // const [ steps, setSteps ] = useState( [] )   // * steps of this project 
  // const { steps, loading: stepsLoading } = useSelector( state => state.step )
  // const [ goals, setGoals ] = useState( [] )   // * project.goals array
  // const [ stepsLoading, setStepsLoading ] = useState( true )
  const [ selectedTabKey, setSelectedTabKey ] = useState( 'details' );

  const { currentProject: project } = useSelector( state => state.project )
  const { steps } = useSelector( state => state.step )


  useEffect( () => {
    // if ( match.params.projectId ) 
    getProjectById( projectId )
    getStepsofProject( projectId )
    // setSteps()
    // fetSteps() 

    // setTimeout( () => { setShowStepList( true ) }, 2000 )

  }, [ projectId ] )


  const completedSteps = steps.filter( item => item.finished === true )
  const todos = steps.filter( item => item.type === 'todo' )
  const notes = steps.filter( item => item.type === 'note' )
  const completionPercentage = completedSteps.length
    ? Math.round( completedSteps.length / todos.length * 100 ) : 0

  const StepListFooter = () => {
    return <div className="p-1 center c-aaa">
      <span className="mr-2">
        Total : { steps.length }
      </span>
      <span className="mr-2">
        Todos: { todos.length }
      </span>
      <span className="mr-2">
        Notes : { notes.length }
      </span>
      <span className="mr-2">
        Completed : { completedSteps.length }
      </span>
    </div>
  }

  const Tab1 = () => {
    console.log( 'Tab 1 rendered.' )
    return <h3>Tab 1</h3>
  }
  const Tab2 = () => {
    console.log( 'Tab 2 rendered.' )
    return <h3>Tab 2</h3>
  }

  //=============================================================
  return <div className="page">
    <div className="center c-888 p-2"> url_id :  { projectId }  </div>

    {/* If project exist */ }
    <div className="bg-w my-3 p-3 border shadow-sm">
      { project
        ? <Tabs
          defaultActiveKey="details"
          id="project-tabls"
          activeKey={ selectedTabKey }
          onSelect={ ( k ) => setSelectedTabKey( k ) }
        >
          <Tab eventKey="details" title="Details" tabClassName="c-444">
            <ProjectDetailsBox
              project={ project }
              completionPercentage={ completionPercentage }
            />
          </Tab>
          <Tab eventKey="graph" title="Graph" tabClassName="c-444">
            { selectedTabKey === "graph" &&
              <ProductivityGraph steps={ steps } /> }
          </Tab>
          <Tab eventKey="contact" title="Contact" tabClassName="c-444">
            <h4>Contact</h4>
          </Tab>
        </Tabs>
        : <p> No project </p> }

    </div>

    {/* Add New Step Form  */ }
    <div className="bg-w my-3 border shadow-sm">
      <div className="step-form-box p-3 bg-w sticky-top">
        {/* Fix sticky step form later */ }
        <div className="mb-3">
          <StepForm projectId={ project ? project._id : '' } />
        </div>
        <StepFilters />
      </div>
      <StepList />
    </div>
    <StepListFooter />
  </div>
}

export default ProjectPg
