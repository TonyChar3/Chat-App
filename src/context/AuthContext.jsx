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

    const fetchContactsList = () => {
        console.log('being called')
        const q = query(collection(db,"users"), where("user_uid", "==", auth.currentUser.uid));
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            
            const contacte = [];
            
            querySnapshot.forEach((doc) => {
            
                doc.data().contact.forEach(con => {
                    console.log(con)
                    contacte.push(con)
                })
                                 
            })
            setContacts(contacte)         
        })

        return () => unsubscribe;
    }


    useEffect(() => {
        auth.onAuthStateChanged(function(user){

            if(user){
                setUser(auth.currentUser)
            }
        })
    })

    useEffect(() => {
        console.log('second useffect')

        if(contacts.length > 0){

            contacts.forEach(each => {
        
                const q = query(collection(db,'users'), where("user_uid", "==", each.id))
            
                const unsubscribe = onSnapshot(q, (querySnapshot) => {

                    const data_updated = [];
            
                    querySnapshot.forEach((docs) => {
                
                        const updated_data = {
                            id: each.id,
                            name: docs.data().name,
                            email: docs.data().email,
                            confirmed: each.confirmed,
                            chatroom_id: each.chatroom_id
                        };
                        data_updated.push(updated_data)
                    })
                    setUpdate(data_updated)
                })
            return () => unsubscribe;
            })
            setContacts([])  
        }
        // } else if(updated_contact.length > 0){

        //     const updateUserApp = async()=> {

        //         if(each && updated_data){


        //             const updtRef = doc(db, 'users', auth.currentUser.uid)

        //             // remove the outdated
        //             updateDoc(updtRef, {
        //                 contact: arrayRemove(each)
        //             })
            
        //             // add the updated
        //             updateDoc(updtRef,{
        //                 contact: arrayUnion(updated_data)
        //             }) 
        //         }
        //     }
            
        // }  
    },[contacts])

    console.log(updated_contact)
    console.log(contacts)
    
    return(
        <UserContext.Provider value={{ registerUser, logOut, SignIn, user, credential, updated_contact, contacts, fetchContactsList }}>
            {children}
        </UserContext.Provider>
    );

}

export const UserAuth = () => {
    return useContext(UserContext)
}