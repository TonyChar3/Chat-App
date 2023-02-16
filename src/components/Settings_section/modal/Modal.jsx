import './modal.css';


const SignupModal = ({ active }) => {
    return(
        <div className="Modal__wrapper">
        
                <form>
                    <div className="passwordInput__container">
                        <input type="password" />
                    </div>
                    <div className="modalBtn__container">
                        <button type="submit">Modify</button>
                        <button>Cancel</button>
                    </div>
                </form>
        </div>
    );
}

export default SignupModal;