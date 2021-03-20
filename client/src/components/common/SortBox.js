import React from 'react'
import { sortBy } from '../../redux/actions/sort.actions'
// import { useSelector } from 'react-redux' 

//===================================================================
const SortBox = () => {

  // const todosRdx = useSelector( ( state ) => state.todo.todos )

  const handleSelect = ( e ) => {
    sortBy( e.target.value )
  }

  return <select
    className="custom-select"
    //defaultValue="sortby"

    onChange={ handleSelect }
  //value={} 
  >
    <option value="">Sort by: </option>
    <option value="sequence">Sequence</option>
    <option value="name">Name</option>
    <option value="finishedAt">Date finished</option>
  </select>
}

export default SortBox 