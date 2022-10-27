import { Link } from 'react-router-dom';

function SignIn(){
    return(
      <div>
        <h1>This is the Signed out page for the user</h1>
        <Link to="/navbar/welcome">SignIn</Link>
      </div>
    );
  }
  
  export default SignIn;