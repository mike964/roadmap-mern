import moment from 'moment'
import React from 'react'

const StepNotesList = ({ notes }) => {
  return (
    <ul className="list-group w-100">
      {notes.map((note) => (
        <li key={note.id} className="list-group-item">
          <div className="row">
            <div className="col"> {note.text}</div>
            <div className="col-auto px-2">
              {' '}
              {moment(note.date).format('YYYY-MM-DD ~ h:mm a')}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default StepNotesList
