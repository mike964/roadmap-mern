import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import Hoverable from '../common/Hoverable'

// Project Progress Completion Bar
const CompletionBar = () => {
  const { steps } = useSelector((state) => state.step)

  const completedSteps = steps.filter((item) => item.completed === true)
  const todos = steps.filter((item) => item.type === 'todo')
  const notes = steps.filter((item) => item.type === 'note')
  const completionPercentage = completedSteps.length
    ? Math.round((completedSteps.length / todos.length) * 100)
    : 0

  return (
    <div className="pt-2">
      <Hoverable hoverText="Completion rate">
        <ProgressBar
          now={completionPercentage}
          striped
          label={`${completionPercentage}%`}
        />
      </Hoverable>
    </div>
  )
}

export default CompletionBar
