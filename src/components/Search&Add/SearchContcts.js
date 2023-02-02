import './SearchContcts.css';

import {useState} from 'react';
import { auth, db } from "../../firebase_setup/firebase";
import { doc, arrayUnion, updateDoc, setDoc } from "firebase/firestore";


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
                const contct_user ={

                    id: Math.floor(Math.random()*1000),
                    name: name,
                    email: email
                }
    
                const docRef = doc(db, "users", auth.currentUser.displayName)
                
                await updateDoc(docRef, {
                    contact: arrayUnion(contct_user)
                })

                await setDoc(doc(db, "chatrooms", contct_user.name),{
                    user_uid: auth.currentUser.uid,
                    contact_id: contct_user.id,
                    messages: []
                })

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