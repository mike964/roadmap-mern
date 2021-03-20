import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

import ProjectForm from './ProjectForm';

const EditProjectModal = ( {
  show,
  handleModalShow
} ) => {

  // const [ show, setShow ] = useState( false )
  // const handleModalShow = () => setShow( !show )

  return <>
    {/* <button className="btn btn-blue mb-2" onClick={ handleModalShow }> + Project </button> */ }

    <Modal show={ show } onHide={ handleModalShow }>

      <Modal.Header closeButton>
        <Modal.Title> Edit Project Details </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Both for Add Project & Edit Project */ }
        <ProjectForm
          handleModalShow={ handleModalShow }
          edit={ true }   // If true means this is update project form else means this is add project form 
        />
      </Modal.Body>

    </Modal>
  </>
}

export default EditProjectModal
