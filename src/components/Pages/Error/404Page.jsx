import './errorpage.css'
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {

    const navigate = useNavigate();

    return(
        <>
            <div className="error-page__wrapper">
                <div className="error-page__container">
                    <h2>Error 404</h2>
                    <button id="error-page__button" onClick={() => navigate("/navbar/contacts/contct")}>
                        Go back to safety
                    </button>
                </div>
            </div>
        </>
    )
}

export default ErrorPage;