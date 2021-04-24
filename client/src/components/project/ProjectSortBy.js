import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { sortProjectBy } from '../../redux/actions/project.actions'

const ProjectSortBy = () => {
  const [selected, setSelected] = useState('')

  // setSortProjectsBy

  return (
    <Form inline>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Sort By</Form.Label>
        <Form.Control
          as="select"
          custom
          className="ml-2"
          //  onChange={(e) => setSelected(e.target.value)}
          onChange={(e) => sortProjectBy(e.target.value)}
          //  value={selected}
        >
          <option value="updatedAt">Date updated</option>
          <option value="createdAt">Date created</option>
          <option value="name">Name</option>
        </Form.Control>
      </Form.Group>
    </Form>
  )
}

export default ProjectSortBy
