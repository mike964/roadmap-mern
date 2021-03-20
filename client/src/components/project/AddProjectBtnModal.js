import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

import ProjectForm from './ProjectForm';

//====================================================================
const AddProjectBtnModal = () => {



  const [ show, setShow ] = useState( false )
  const handleModalShow = () => setShow( !show )



  //================================================================================
  return <>
    <button className="btn btn-blue mb-2" onClick={ handleModalShow }>
      + Project
  </button>

    <Modal show={ show } onHide={ handleModalShow }>

      <div className="modal-header p-2 center">
        <span className="em-12 bold"> + New Project </span>
      </div>

      <Modal.Body className="p-3">
        {/* Both for Add Project & Edit Project */ }
        <ProjectForm
          handleModalShow={ handleModalShow }
          edit={ false }   // If true means this is update project form else means this is add project form 
        />
      </Modal.Body>

    </Modal>
  </>
}

export default AddProjectBtnModal
