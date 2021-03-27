import React, { useState, useEffect } from 'react'
import { deleteStep_DB, updateStep } from '../../redux/actions/step.actions';
import { useSelector } from 'react-redux';
import XIcon from '../Icons/XIcon';
import ChevronSvg from '../Icons/ChevronSvg';
import { Accordion, Form } from 'react-bootstrap';
import moment from 'moment';
import EditBtn from '../common/EditBtn';
import Hoverable from '../common/Hoverable';
import SucssFailSpinr from '../common/SucssFailSpinr';

const StepItem = ( { step } ) => {
  const { hideNotes, hideCompleted } = useSelector( state => state.global )

  const [ isEditing, setIsEditing ] = useState( false )
  const [ reqStatus, setReqStatus ] = useState( '' )   // success - fail - spinner
  const [ state, setState ] = useState( {   // step
    // name: step.name,
    // createdAt: step.createdAt,
    // finished: step.finished,
    // finishedAt: step.finished ? step.finishedAt : '',
    // type: step.type,
    // note: step.note ? step.note : '',
  } )

  useEffect( () => {
    if ( step ) {
      setState( {
        ...step,
        note: step.note ? step.note : '',
        // finishedAt: !step.finishedAt ? '' : step.finishedAt
      } )
      // * In order to prevent input null prop error
    }
  }, [ step ] )

  const step_createdAt = moment( step.createdAt ).format( 'YYYY-MM-DD, h:mm A' )
  const step_createdAt_short = moment( step.createdAt ).format( 'YY MMM DD, H' )
  const step_finishedAt = moment( step.finishedAt ).format( 'YYYY-MM-DD, h:mm A' )
  const step_finishedAt_short = moment( step.finishedAt ).format( 'YYYY-MM-DD, h:mm A' )

  const [ expanded, setExpanded ] = useState( false )

  const handleInputChange = ( e ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked
      : e.target.value
    setState( { ...state, [ e.target.name ]: value } )
  }

  const left_border_color = step.type === 'note' ? 'gold' : ( step.finished ? 'blue' : '#ccc' )
  const bg_color = step.type === 'note' ? '#fff8ea' : ( step.finished ? '#e6f3ff' : '#fff' )

  const style_ = {
    borderLeft: `4px solid ${ left_border_color }`,
    background: bg_color,
  }

  const handleExpansion = () => {
    if ( !isEditing )
      setExpanded( !expanded )
  }

  const handleDeleteClick = () => {
    // first pop up to make sure
    if ( window.confirm( "Are you sure?" ) )
      deleteStep_DB( step._id )
  }

  const handleSaveClick = async () => {
    setReqStatus( 'spinner' )
    const success = await updateStep( step._id, {
      name: state.name,
      type: state.type,
      note: state.note,
      // createdAt: state.createdAt,
      // finishedAt: state.finishedAt  // * No need 
    } )

    setReqStatus( success ? 'success' : 'fail' )
    if ( success ) setIsEditing( !isEditing )
    setTimeout( () => setReqStatus( '' ), 3000 )
  }

  const handleCheckbox = async ( e ) => {
    handleInputChange( e )
    setReqStatus( 'spinner' )
    const checked = e.target.checked
    const success = await updateStep( step._id,
      { finished: checked, finishedAt: checked ? Date.now() : '' }
    )
    setReqStatus( success ? 'success' : 'fail' )

    setTimeout( () => setReqStatus( '' ), 3000 )
  }

  const handleEditClick = () => {
    setIsEditing( !isEditing )
    setExpanded( !expanded ? true : false )
  }

  // * Check to see if hide this step or display
  const checkHide = () => {
    if ( hideNotes && step.type === 'note' ) {
      return true
    } else if ( hideCompleted && step.type === 'todo' && step.finished ) {
      return true
    } else {
      return false
    }
  }

  const hideStep = checkHide()
  // console.log( hideStep )

  //============================================================================
  return <>{
    hideStep ? <></>
      : <div className="step-item" style={ style_ }>
        <div className="row">
          <div className="col-auto p-2">
            { step.type === 'note'
              ? <i className="fas fa-sticky-note gold" />
              : <Form.Check
                inline
                type='checkbox'
                name='finished' id={ `checkbox-1` }
                checked={ step.finished }
                onChange={ handleCheckbox }
              />
            }
          </div>
          <div className="col p-2 " style={ { height: !expanded ? '40px' : 'auto' } }
            onClick={ handleExpansion }
            data-toggle="collapse"
            href={ !isEditing ? `#collapse-${ step._id }` : 'x' }
            aria-expanded="false"
            aria-controls={ `collapse-${ step._id }` }
          >
            { isEditing
              ? <input className="no-style-input w-100" type="text"
                name='name' value={ state.name }
                onChange={ handleInputChange }
              />
              : <span> { step.name } </span> }
          </div>
          { !isEditing && <div className="col-3 center py-2">
            { step.type === 'note' ? <span>{ step_createdAt }</span>
              : <Hoverable hoverText={ `Added ${ step_createdAt }` }>
                <span>
                  { step.finished
                    ? <span className="x">{ step_finishedAt }</span>
                    : <span className="c-999">Not yet</span> }
                </span>
              </Hoverable>
            }
          </div> }

          {/* Delete & Edit Btns */ }
          <div className="col-auto p-2" >
            <SucssFailSpinr status={ reqStatus } />
            <EditBtn
              onClick={ handleEditClick }
              onSave={ handleSaveClick }
              isEditing={ isEditing }
              onlyIcon
            >
              <i className="fas fa-pen-square mr-2 skyblue" />
            </EditBtn>
            { !isEditing &&
              <i onClick={ handleDeleteClick } className="fas fa-times-circle red action-btn" /> }
          </div>
        </div>

        {/* SECOND ROW - WHEN STEP EXPAND */ }
        <div className="collapse" id={ `collapse-${ step._id }` }>
          <div className="row">
            <div className="col p-2">
              Note :
             { isEditing
                ? <input className="no-style-input w-100" type="text"
                  name='note'
                  value={ state.note }
                  onChange={ handleInputChange }
                />
                : <span>{ step.note } </span> }
            </div>
            <div className="w-100"></div>
            <div className="col p-2">
              Added : { ' ' }
              { isEditing
                ? <input className="no-style-input w-100"
                  type="text"
                  name='createdAt' value={ state.createdAt }
                  onChange={ handleInputChange }
                /> : <span>{ step_createdAt }</span>
              }</div>
            { step.type === 'todo' && <div className="col p-2">
              Completed : { ' ' }
              { isEditing
                ? <input className="no-style-input w-100"
                  type="text"
                //name='finishedAt' value={ state.finishedAt }
                // onChange={ handleInputChange }
                /> : <>
                  { step.finished
                    ? <span className="x">{ step_finishedAt }</span>
                    : <span className="c-999">Not yet</span> }
                </>
              }</div> }
            <div className="col p-2">
              { isEditing && <div className="x">
                Type  <Form.Control as="select" name='type'
                  value={ state.type }
                  onChange={ handleInputChange }
                >
                  <option value='todo'> Todo </option>
                  <option value='note'> Note </option>
                </Form.Control>
              </div> }
            </div>
          </div>
        </div>
      </div>
  }
  </>
}

export default StepItem