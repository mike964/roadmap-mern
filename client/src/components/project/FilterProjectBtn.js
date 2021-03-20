import React, { useState } from 'react'

const FilterProjectBtn = () => {

  const [ showFilters, setShowFilters ] = useState( false )

  return <>
    <button
      className="float-right filterProject-btn"
      onClick={ () => { setShowFilters( !showFilters ) } }
    >Filter</button>

    { showFilters && <div className="filters-box">
      filters
    </div> }
  </>
}

export default FilterProjectBtn
