import React, { useEffect } from 'react'
import AddProjectBtnModal from '../components/project/AddProjectBtnModal'
// import ExpansionList from '../components/ExpansionList'
import { useSelector } from 'react-redux'
import FilterProjectBtn from '../components/project/FilterProjectBtn'
import { Spinner } from 'react-bootstrap'
import Spinnerr from '../components/Spinnerr'
import { getMyProjects } from '../redux/actions/project.actions'
import ProjectTable from '../components/project/ProjectTable'
import { Route, Switch, useParams } from 'react-router-dom'


// ** My (logged in user) projects page
const ProjectsPg = () => {
  // const { projects } = useSelector( state => state.project )
  const projectLoading = useSelector( state => state.project.loading )
  const { projects } = useSelector( state => state.project )


  function Child () {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();

    return (
      <div>
        <h3>ID: { id }</h3>
      </div>
    );
  }

  //======================================================================
  return <div className="x">
    <div className="container">

      <div className="row py-3">
        <div className="col">
          <AddProjectBtnModal />
        </div>
        <div className="col-3">
          <button>Sort by</button>
          <FilterProjectBtn />
        </div>
      </div>

      { projectLoading ? <div className="text-center pt-5">
        {/* <Spinner animation="border" variant="primary" /> */ }
      </div>
        : <div className="bg-w">
          <ProjectTable projects={ projects } />
        </div>
      }
    </div>

  </div>
}

export default ProjectsPg
// <ProjectList projects={ projects } />