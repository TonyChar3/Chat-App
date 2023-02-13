import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase_setup/firebase';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({})

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const SignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });

        return () => unsubscribe()
    })

    return(
        <UserContext.Provider value={{ registerUser, logOut, SignIn, user }}>
            {children}
        </UserContext.Provider>
    );

}

export const UserAuth = () => {
    return useContext(UserContext)
}