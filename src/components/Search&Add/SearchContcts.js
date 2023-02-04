import './SearchContcts.css';

import {useState} from 'react';
import { auth, db } from "../../firebase_setup/firebase";
import { doc, arrayUnion, updateDoc, setDoc, getDoc } from "firebase/firestore";


const SearchContcts = () => {

    const [Active, setActive] = useState(false);
    const [name, setName ] = useState("");
    const [email, setEmail ] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        setActive(active => !active);
    }

    const handleName = (e) => {
        setName(e)
    }

    const handleEmail = (e) => {
        setEmail(e)
    }

    const handleAddon = async(e) => {
        e.preventDefault();
        try{

            if(name === "" || email === ""){
                alert("Please enter the info of your new contact")
            }else{

    
                const docRef = doc(db, "users", auth.currentUser.displayName)
                const contctRef = doc(db, 'users', name)

                const contct_snap = await getDoc(contctRef)

                // The user exist in the DB
                if(contct_snap.exists()){
                    console.log(contct_snap.data())

                    // Doc ref for the invitation
                    const invitRef = doc(db, 'users', contct_snap.data().name)

                    // Create the contact object 
                    const contct_user ={

                        id: contct_snap.data().user_uid,
                        name: contct_snap.data().name,
                        email: contct_snap.data().email,
                        confirmed: ""
                    }

                    // Add it to the contact list of the current User
                    await updateDoc(docRef, {
                        contact: arrayUnion(contct_user)
                    })
                    
                    // Create the invite object
                    const invite = {
                        id: Math.floor(Math.random()*100),
                        sent_from: auth.currentUser.displayName,
                        sender_email: auth.currentUser.email
                    }

                    // Send an Invite to the Added user
                    await updateDoc(invitRef, {
                        invitations: arrayUnion(invite)
                    })


                } else{
                    console.log('User not found in our database')
                }
                


                // await setDoc(doc(db, "chatrooms", contct_user.name),{
                //     user_uid: auth.currentUser.uid,
                //     contact_id: contct_user.id,
                //     messages: []
                // })

            }

        }catch(error){
            console.log(error.code)
        }

        setName("")
        setEmail("")
    }


    let toggleActive = Active ? 'form_active' : '';

    return(
        <>

            <div className='searchContcts__container'>
                <div className="plus__container">
                    <i className="bi bi-plus-circle" onClick={handleClick}></i>
                </div>
            </div>
            <div className="addContcts__container">
                <div className={`addContcts__form ${toggleActive}`}>
                    <form id="addForm" onSubmit={handleAddon}>
                        <div className="closeBtn__container">
                            <i className="bi bi-x-circle" onClick={handleClick}></i>
                        </div>
                        <h2>Add a contact</h2>
                        <div className="addContcts__Name">
                            <input type="text" id="addContctsName_input" placeholder="Name" value={name} onChange={(e) => handleName(e.target.value)} />
                        </div>
                        <div className="addContcts__Email">
                            <input type="email" id="addContctsEmail_input" placeholder="Email" value={email} onChange={(e) => handleEmail(e.target.value)} />
                        </div>
                        <div className="addContctsBtn__container">
                            <button type="submit" id="addContctsBtn">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
}

export default SearchContcts;