import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase_setup/firebase';
import {collection, query, where, onSnapshot, doc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [credential, setCredentials] = useState([])
    const [contact, setContacts] = useState([])
    const [updated_contact, setUpdate] = useState([])

    

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const SignIn = (email, password) => {

        setCredentials(password)

        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const updateUserApp = async(contact_array) => {

        try{

            const updtRef = doc(db, 'users', auth.currentUser.uid)

            console.log(contact_array)
            console.log(updated_contact)

            for (let i = 0; i < contact_array.length; i++){

                console.log(contact_array[i])
                console.log(updated_contact[i])
                // // remove the outdated
                // await updateDoc(updtRef, {
                //     contact: arrayRemove({
                //         'chatroom_id': contact[i].chatroom_id,
                //         'confirmed': contact[i].confirmed,
                //         "email": contact[i].email,
                //         "id": contact[i].id,
                //         "name": contact[i].name
                //     })
                // })

                // // add the updated
                // await updateDoc(updtRef,{
                //     contact: arrayUnion({
                //         'chatroom_id': updated_contact[i].chatroom_id,
                //         'confirmed': updated_contact[i].confirmed,
                //         "email": updated_contact[i].email,
                //         "id": updated_contact[i].id,
                //         "name": updated_contact[i].name
                //     })
                // })

            }
        } catch(error){
            console.log(error)
        }
    }

    const getUpdatedData = () => {
        auth.onAuthStateChanged(function(user) {

            if(user){
                if(contact.length > 0){

                    const data_contact = [];
    
                    contact.forEach(cont => {
    
                        const q = query(collection(db,"users"), where("user_uid", "==", cont.id));
            
                        const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
                            querySnapshot.forEach((doc) => {
    
                                const updated_data = {
                                    chatroom_id: cont.chatroom_id,
                                    confirmed: cont.confirmed,
                                    email: doc.data().email,
                                    id: cont.id,
                                    name: doc.data().name
                                }

                                data_contact.push(updated_data)

                                
                            })
                        })
                        setUpdate(data_contact)

                        return () => unsubscribe()
                    })  
                }
            }
        })
    }

    useEffect(() => {
        auth.onAuthStateChanged(function(user){

            if(user){
                setUser(auth.currentUser)

                const q = query(collection(db,"users"), where("user_uid", "==", auth.currentUser.uid));
    
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
                    const contacte = [];
    
                    querySnapshot.forEach((doc) => {
    
                        doc.data().contact.forEach(con => {
                            contacte.push(con)
                        })
                        setContacts(contacte)   
                    })
                })
                return () => unsubscribe
            }
        })
 
    })

    return(
        <UserContext.Provider value={{ registerUser, logOut, SignIn, user, credential, updateUserApp, getUpdatedData }}>
            {children}
        </UserContext.Provider>
    );

}

export const UserAuth = () => {
    return useContext(UserContext)
}