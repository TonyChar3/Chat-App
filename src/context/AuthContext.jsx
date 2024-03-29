import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase_setup/firebase_setup';


const UserContext = createContext();

export const AuthContextProvider = ({children}) => {

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
        const unsubscribe = auth.onAuthStateChanged(function(user){
            if(!user) {
                setUser(null)
            }
            setUser(user) 
        });
        return () => unsubscribe();
    },[auth]);

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