import moment from 'moment'
import React from 'react'
import { deleteStepNote } from '../../redux/actions/step.actions'
import axos from '../../utils/axos'

const StepNotesList = ({ stepId, notes }) => {
  const handleDeleteNote = (noteId) => {
    //  axos.post(`/api/steps/${stepId}/note/delete`, {noteId:noteId})
    deleteStepNote(stepId, noteId)
  }
  return (
    <div className="p-2">
      <ul className="list-group w-100" style={{ listStyleType: 'none' }}>
        {notes.map((note) => (
          <li key={note.id} className="x">
            <div className="row">
              <div className="col"> {note.text}</div>
              <div className="col-auto px-2">
                {' '}
                {moment(note.date).format('YYYY-MM-DD ~ h:mm a')}
              </div>
              <div className="col-auto">
                <i
                  className="fas fa-times c-666 clickable"
                  onClick={() => handleDeleteNote(note.id)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StepNotesList
