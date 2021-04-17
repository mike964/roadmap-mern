import express from 'express'
import adminRoutes from './routes/admin.route.js'
import projectRoutes from './routes/project.route.js'
// import authRoutes from './routes/auth.route.js'
import stepRoutes from './routes/step.route.js'



// const app = express()
const router = express.Router()

const app = router



// app.use( '', require( './server/routes' ) )
//==============================================================
// *** Mounting Routers ***
// app.use( '/auth', authRoutes )
app.use( '/projects', projectRoutes )
// app.use( '/my-projects', require( './routes/my-projects.route' ) )
app.use( '/steps', stepRoutes )
// app.use( '/users', require( './routes/users.route.js' ) )
app.use( '/admin', adminRoutes )

// export default router
export default router