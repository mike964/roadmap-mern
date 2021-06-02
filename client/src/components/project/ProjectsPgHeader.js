import React from 'react'
import AddProjectBtnModal from './AddProjectBtnModal'
import ProjectSearchInput from './ProjectSearchInput'
import ProjectSortBy from './ProjectSortBy'

// * Projects Page Header
const ProjectsPgHeader = () => {
  return (
    <div className="row py-3">
      <div className="col-sm-4 col-md-6">
        <ProjectSearchInput />
      </div>
      <div className="col text-center">
        <ProjectSortBy />
      </div>
      <div className="col-auto">
        <AddProjectBtnModal />
      </div>
    </div>
  )
}

export default ProjectsPgHeader
