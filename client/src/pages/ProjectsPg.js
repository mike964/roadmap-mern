import React, { useEffect } from 'react'

// import ExpansionList from '../components/ExpansionList'
import { useSelector } from 'react-redux'
import { getMyProjects } from '../redux/actions/project.actions'
import ProjectTable from '../components/project/ProjectTable'
import SpinrBox from '../components/common/SpinrBox'
import { sortProjectsByDate } from '../redux/actions/global.actions'

import ProjectsPgHeader from '../components/project/ProjectsPgHeader'

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
      <ProjectsPgHeader />

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
