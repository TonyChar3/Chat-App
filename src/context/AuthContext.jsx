import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, browserSessionPersistence, setPersistence } from 'firebase/auth';
import { auth } from '../../firebase_setup/firebase_setup';


const UserContext = createContext();

export const AuthContextProvider = ({children}) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({})
    const [credential, setCredentials] = useState([])
    const [contacts, setContacts] = useState([])
    const [updated_contact, setUpdate] = useState([])

    
    // to register a new user
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // to sign-in the user
    const SignIn = (email, password) => {
        // get his credential to be user in the app
        setCredentials(password)
        // sign in the user
        return signInWithEmailAndPassword(auth, email, password)
    }

    // to log out the user
    const logOut = () => {
        setContacts([])
        setUpdate([])
        return signOut(auth)
    }

    useEffect(() => {
        // Keep the current logged in user state
        auth.onAuthStateChanged(function(user){
            if(user){
                // set the current user
                setUser(auth.currentUser)
            }
        })
    },[auth])

    useEffect(() => {
        // Navigate to the menu if signed in
        if(user !== null){
            // set the session to persist until the user logs out
            setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // navigate to the first/main page of the app
                navigate("/navbar/contacts/contct");
            });
        }
    },[auth])

    return(
        <UserContext.Provider value={{ 
            registerUser, 
            logOut, 
            SignIn, 
            user, 
            credential, 
            updated_contact, 
            contacts 
            }}>
            {children}
        </UserContext.Provider>
    );

}

export const UserAuth = () => {
    return useContext(UserContext)
}