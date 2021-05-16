import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadUser } from '../redux/actions/auth.actions'
import { getMyProjects } from '../redux/actions/project.actions'

const HomePg = (props) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    //   props.history.push( '/projects' );
    // }

    // loadUser()
    // props.history.push( '/projects' )

    if (isAuthenticated) {
      props.history.push('/projects')
    }

    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <div>
      HomePg
      <p>Best Project Management App 😇 </p>
      <p>Sing up if you havent</p>
    </div>
  )
}

export default HomePg
