import { Outlet } from "react-router-dom";
import Contacts from "./contacts_container/contacts";
import SearchContcts from "./Contact_add_form/SearchContcts";

const ContctsSect = () => {
    return(
        <>
            <Outlet />
        </>
    );
}

export default ContctsSect;