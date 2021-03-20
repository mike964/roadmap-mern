import { v4 as uuidv4 } from 'uuid'

// mock data

const users = [
  {
    "role": "user",
    "name": "John",
    "email": "john@mail.com",
    "password": "1234",
    "_id": "johnuser-3453425423"
  },
  {
    "role": "user",
    "name": "mike",
    "email": "mike@mail.com",
    "password": "1234",
    "_id": "mikeuser-45643634"
  }
]

const projects = [
  {
    "name": "Andrew Expensify v2",
    "description": "Moslm version of andrew expensify project",
    // "goals": help users to ...
    "goals": "Help myself to understand react better / Prepare for next step",
    // "structure":  // main idea - big picture - ideas - how this app works? users do this, admin do that ... 
    "started": false,
    "finished": false,
    "createdAt": 1588385449265,
    "startedAt": null,
    "finishedAt": null,
    "user": "asd23434523432",
    "_id": "498623095730473045924"
  },
  {
    "name": "Winit",
    "description": "Simple football prediction. OMG, My dream to make million dollars:)",
    user: '6026ef86840b164d20d3b255',  // mike in db
    "createdAt": 1588385504671,
    "startedAt": null,
    "finishedAt": null,
    "_id": "275279717856319752612"
  },
  {
    "name": "Roadmap",
    "description": "Simple project management. An app for people like me to make managing projects easier and show the duration for each project to complete",
    "createdAt": 1588388270958,
    "startedAt": null,
    "finishedAt": null,
    "user": "asd23434523432",
    "_id": "8697409569738451234123"
    // steps : []
  },
  {
    "name": "GeoChartson",
    "description": "Simple GeoJson chart. An app to display a point by GeoJSON coordinates and show it using Chart.js. The point of building this app is actuatlly to make understand Geojson simplest and clearest and easiest way :)",
    "createdAt": 1588388270958,
    "startedAt": null,
    "finishedAt": null,
    "user": "asd23434523432",
    "_id": "86974095684645631234123"
  },
  {
    user: '6026ef86840b164d20d3b255',
    name: 'Amazon Clone',
    description: 'Online store',
    "started": false,
    "finished": false,
    "createdAt": 1592041567658
  }
]

const steps = [
  {
    _id: uuidv4(),
    project: "some project id",
    name: null,
    createdAt: null,  // added at
    started: false,
    startedAt: null,
    finished: true,
    finishedAt: null
    // group : 'backend' , 'frontend'
    // description : ''
  },
  {
    _id: uuidv4(),
    project: "498623095730473045924",
    name: 'First step of Expensify v2',
    createdAt: null,  // added at
    started: false,
    startedAt: null,
    finished: true,
    finishedAt: null
  },
  {
    _id: uuidv4(),
    project: "498623095730473045924",
    name: 'Second step of Expensify v2',
    createdAt: null,  // added at
    started: false,
    startedAt: null,
    finished: false,
    finishedAt: null
  },
  {
    _id: uuidv4(),
    project: "498623095730473045924",
    name: 'Third step of Expensify v2',
    createdAt: null,  // added at
    started: false,
    startedAt: null,
    finished: false,
    finishedAt: null
  },
  {
    _id: uuidv4(),
    project: "275279717856319752612",
    name: 'Winnit first step',
    createdAt: null,  // added at
    started: false,
    startedAt: null,
    finished: false,
    finishedAt: null
  },
  {
    _id: uuidv4(),
    project: "275279717856319752612",
    name: 'Winnit second step',
    createdAt: null,  // added at
    started: false,
    startedAt: null,
    finished: false,
    finishedAt: null
  },
  {
    _id: uuidv4(),
    project: "275279717856319752612",
    name: 'Winnit third step',
    createdAt: null,  // added at
    started: false,
    startedAt: null,
    finished: false,
    finishedAt: null
  }
]



export { projects, users, steps }