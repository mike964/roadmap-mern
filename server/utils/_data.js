// import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin Mike',
    email: 'admin@mail.com',
    // password: bcrypt.hashSync('123456', 10),
    password: '123123',
    // isAdmin: true,
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@mail.com',
    // password: bcrypt.hashSync('123456', 10),
    password: '12123',
  },
]

const projects = [
  {
    "name": "Expensify",
    "user": "6045e58d1a4eb39248cdc6a2",
    "_id": "6045e9b8d6a73d508403ce7c",
    "description": "Moslm version of andrew expensify project",
    "goals": "Help myself to understand react better / Practice React JS / Prepare for next step",
    // "structure":  // main idea - big picture - ideas - how this app works? users do this, admin do that ... 
    // steps : []
  },
  {
    "name": "Roadmap",
    "_id": "6045e9b8d6a73d508403ce7d",
    "user": "6045e58d1a4eb39248cdc6a2",
    "description": "Simple project management tool for people like me to make managing projects easier",
    "goals": "Help developers to organise projects in better way / Give feeling of accomlishment",
    "features": "Show the duration for each project to complete"
  },
  {
    "name": "Winit",
    "_id": "6045e9b8d6a73d508403ce7e",
    "user": "6045e58d1a4eb39248cdc6a3",
    "description": "Simple football prediction. OMG, My dream to make million dollars:)"
  }
]

const steps = [
  {
    project: ""
  }
]

export { users, projects, steps }