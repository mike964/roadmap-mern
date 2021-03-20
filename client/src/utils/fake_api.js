/* eslint-disable no-case-declarations */
import { projects, users } from './_data';

const fake_api = ( endpoint, payload ) => {
  let data = ''
  console.log( payload )

  switch ( endpoint ) {
    case "/projects":
      data = { projects };
      break;
    case "/projects/id":
      let project = projects.filter( ( item ) => item._id === payload )   // payload = id
      // console.log( project )   // array
      data = project[ 0 ]
      break;
    case "/auth/login":
      // * No need to check password - only email
      let user = users.filter( ( item ) => item.email === payload.email )[ 0 ]   // payload = {user}
      console.log( user )
      data = {
        user,
        token: user._id   // send user._id as token
      }
      break;
    case "/auth/me":   // Get me: Get current logged in user info
      let user_ = users.filter( ( item ) => item._id === payload )[ 0 ] // payload : token
      data = {
        user: user_
      }
      break;
    default:
      // data = "No project found";
      data = null;
  }

  return data;
};

export const axios_get = ( endpoint, payload ) => {
  // ** payload could be req.paramas if req is GET or req body if req is POST
  console.log( "--- fake api: axios_get" );
  const thePromise = new Promise( ( resolve, reject ) => {
    // resolve(meetingDetails); // means return
    let data = fake_api( endpoint, payload );
    // console.log(data);

    setTimeout( () => {
      if ( data ) {
        resolve( {  // Return 
          data: {
            ...data,
            success: true
          }
        } )
      } else {
        reject( new Error( "No data to return!" ) );
      }
    }, 1000 )
  } );

  // const result = await thePromise();   // TypeError: thePromise is not a function
  // return result;
  return thePromise;
}

// export { axios_get }