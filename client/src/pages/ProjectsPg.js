import React, { useEffect } from 'react'
import AddProjectBtnModal from '../components/project/AddProjectBtnModal'
// import ExpansionList from '../components/ExpansionList'
import { useSelector } from 'react-redux'
import { getMyProjects } from '../redux/actions/project.actions'
import ProjectTable from '../components/project/ProjectTable'
import { Route, Switch, useParams } from 'react-router-dom'
import SpinrBox from '../components/common/SpinrBox'
import { sortProjectsByDate } from '../redux/actions/global.actions'
import ProjectSortBy from '../components/project/ProjectSortBy'

// ** My (logged in user) projects page
const ProjectsPg = () => {
  console.log('# ProjectsPg mounted')
  // const { projects } = useSelector( state => state.project )
  const { projects, loading } = useSelector((state) => state.project)
  // const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    // if (isAuthenticated) {  // no need bcuz it's private route
    getMyProjects()
    // }
  }, [])

  const sorted_projects = sortProjectsByDate(projects)
  // const sorted_projects = projects
  //======================================================================
  return (
    <div className="container p-0">
      <div className="row py-3">
        <div className="col">
          <AddProjectBtnModal />
        </div>
        <div className="col-6 col-sm-4">
          <ProjectSortBy />
        </div>
      </div>

      {loading ? (
        <SpinrBox />
      ) : (
        <div className="bg-w">
          <ProjectTable projects={sorted_projects} />
        </div>
      )}
    </div>
  )
}

export default ProjectsPg
// <ProjectList projects={ projects } />
