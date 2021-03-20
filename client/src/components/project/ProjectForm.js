import React, { useState, useEffect } from 'react'
import cx from "classnames"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { addProject_DB } from '../../redux/actions/project.actions'
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';



// This component is used both for Adding and Editing projects  // only adding new project
//===================================================================================
const ProjectForm = ( { edit, handleModalShow } ) => {


  const Checkbox = () => <span></span>

  const { currentUser } = useSelector( state => state.auth )
  const project = useSelector( state => state.project.currentProject )


  // If (edit=true)=> Edit Project, Else => Add Project
  // const [ name, setname ] = useState( edit ? project.name : '' ) 
  // const [ started, setStarted ] = useState( edit ? project.started : false ) 
  // const [ finishedDate, setFinishedDate ] = useState( finished ? new Date() : null )

  const [ state, setState ] = useState( {
    name: '',
    description: '',
    goals: '',
    // startedAt: new Date()
  } )

  const handleSubmit = async ( e ) => {
    e.preventDefault()
    const newProject = {
      ...state,
      user: currentUser._id
    }

    console.log( newProject ) // for test 

    const success = await addProject_DB( newProject )
    if ( success ) {
      setTimeout( () => handleModalShow(), 900 )    // * close modal after success
    } else {
      console.log( 'NO SUCCESS!' )
    }
    // }
  }

  const onChange = ( e ) => setState( { ...state, [ e.target.name ]: e.target.value } )

  const FormLabel = ( { label } ) => <p className="bold c-444 mb-1">{ label }</p>

  //============================================================================
  return <Form onSubmit={ handleSubmit }>

    <Form.Group controlId="exampleForm.ControlInput1">
      <FormLabel label='name' />
      <Form.Control
        type="text"
        name='name'
        onChange={ onChange }
        value={ state.name }
      />
    </Form.Group>

    <Form.Group controlId="exampleForm.ControlTextarea1">
      <FormLabel label='Description' />
      <Form.Control
        as="textarea"
        // placeholder="Description..."
        name='description'
        rows={ 2 }
        onChange={ onChange }
        value={ state.description }
      />
    </Form.Group>

    <Form.Group controlId="exampleForm.ControlTextarea1">
      <FormLabel label='Goals' />
      <Form.Control
        name='goals'
        as="textarea"
        rows={ 2 }
        placeholder="Help users to ..."
        value={ state.goals }
        onChange={ onChange }
      />
      <Form.Text className="text-muted">
        Split each by /
    </Form.Text>
    </Form.Group>

    {/* <div className="row mb-3">
      <div className="col-3">
        <FormLabel label='Started at' />
      </div>
      <div className="col">
        <DatePicker
          selected={ state.startedAt }
          className="form-control ml-2"
          onChange={ date => setState( { ...state, startedAt: date } ) }
          placeholderText="Select a date"
        />
      </div> 
    </div> */}

    <button
      type="submit"
      // className={ cx( "filter", currentFilter === activeFilter && "filter--active" ) }
      className={ cx( "btn btn-block", edit && "btn-success white", !edit && "btn-blue" ) }
    > { ( edit ? 'Update' : 'Submit' ) }
    </button>

  </Form >
}

export default ProjectForm
