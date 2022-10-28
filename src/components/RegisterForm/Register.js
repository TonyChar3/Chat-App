import ParticlesBg from 'particles-bg';
import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
    return(
        <>
        <ParticlesBg className="particles" color="#14b4e9" type='cobweb' bg={true}/>
        <div className="registr__container">
            <h2>Register</h2>
            <div className="fullname__wrapper">
                <label htmlFor="fullname">Full name:</label>
                <input type="text" name="fullname" id="fullnameInput" placeholder="Ex:Jane Doe" />
            </div>
            <div className="userName__wrapper">
              <label htmlFor="username">Enter a UserName:</label>
              <input type="text" name="username" id="userNameInput" />
            </div>
            <div className="password__wrapper">
              <label htmlFor="password">Enter a Password:</label>
              <input type="text" id="passWrdInput" />
            </div>
            <div className="buttons__wrapper">
              <Link to="/navbar/welcome"><input type="submit" value="Register" id="signIn__btn" /></Link>
            </div>
        </div>
        </>
    );
}

export default Register;