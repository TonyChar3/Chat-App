import './welcome.css';
import ParticlesBg from 'particles-bg';

function Welcome(){
    return(
            <div className="welcomePage__background">
                <div className="welcomePage__container">
                    <ParticlesBg className="particles" color="#f2f6f7" type='polygon' bg={true}/>
                    <h2 className="welcomePage__title">Welcome to the Chat App!</h2>
                    <p className="welcomePage__text">This Chat App is only a mock-up to show case my Front-end Skills!</p>
                </div>
            </div>
    )
}

export default Welcome;