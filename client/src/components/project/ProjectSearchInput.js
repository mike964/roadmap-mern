import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { setProjectSearch } from '../../redux/actions/global.actions'

// * Project search bar
// * Find a project by name in projects pg
// * https://www.w3schools.com/howto/howto_js_filter_table.asp

const ProjectSearchInput = () => {
  const handleInputChange = (e) => {
    // console.log(e.target.value)   // Good
    setProjectSearch(e.target.value)
  }

  return (
    <InputGroup className="mb-3" onChange={handleInputChange}>
      {/* <InputGroup.Text id="find-project">
          <i className="fas fa-search" />
        </InputGroup.Text> */}
      <FormControl
        placeholder="Find a project..."
        aria-label="find-project"
        aria-describedby="find-project"
      />
    </InputGroup>
  )
}

export default ProjectSearchInput
