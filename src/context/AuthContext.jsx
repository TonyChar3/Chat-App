import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase_setup/firebase';
import {collection, query, where, onSnapshot, doc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [credential, setCredentials] = useState([])
    const [contacts, setContacts] = useState([])
    const [updated_contact, setUpdate] = useState([])

    

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const SignIn = (email, password) => {

        setCredentials(password)

        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setContacts([])
        setUpdate([])
        return signOut(auth)
    }


    useEffect(() => {
        auth.onAuthStateChanged(function(user){

            if(user){
                setUser(auth.currentUser)
            }
        })
    })

    
    return(
        <UserContext.Provider value={{ registerUser, logOut, SignIn, user, credential, updated_contact, contacts }}>
            {children}
        </UserContext.Provider>
    );

}

export const UserAuth = () => {
    return useContext(UserContext)
}