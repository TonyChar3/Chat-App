import './contactscroll.css';

const ContactsScroll = (props) => {
    return (
        // scroll to activate when the contact card overflow its height or width
        <div className="contact-card-scroll__container">
            {props.children}
        </div>
    );
}


export default ContactsScroll;