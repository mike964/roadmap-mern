import React from 'react'
import moment from 'moment'
import { Table } from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom'
import { deleteProject } from '../../redux/actions/project.actions'

// ** All projects of logged in user table
const ProjectTable = ({ projects }) => {
  let { path, url } = useRouteMatch()
  // console.log( url, path )   //  output: / /

  const handleDeleteProject = (id) => {
    // first pop up to make sure
    if (window.confirm('Are you sure?')) deleteProject(id)
  }

  return (
    <Table striped className="border">
      <thead>
        <tr>
          <th> # </th>
          <th width="200"> Title </th>
          <th> Description </th>
          <th width="120"> Added at </th>
        </tr>
      </thead>
      <tbody>
        {projects.length ? (
          <>
            {projects.map((item, index) => {
              let description_short = item.description
                ? item.description.slice(0, 60)
                : 'No description'

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="clickable">
                    <span
                      className={`em-08 pr-2 ${
                        item.active ? 'limegreen' : 'beige'
                      }`}
                    >
                      <i className="fas fa-circle" />
                    </span>
                    <Link to={`projects/${item.slug}`}>{item.name}</Link>
                  </td>
                  <td>{description_short}</td>
                  <td>{moment(item.createdAt).format('YYYY-MM-DD')}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt skyblue clickable"
                      onClick={() => handleDeleteProject(item._id)}
                    />
                  </td>
                </tr>
              )
            })}
          </>
        ) : (
          <>
            <tr>
              <td colSpan="6" className="center">
                {' '}
                No projects{' '}
              </td>
            </tr>
          </>
        )}
      </tbody>
    </Table>
  )
}

export default ProjectTable
// https://reactrouter.com/web/example/nesting */ }
