import '../../Contact_Section/Contact_scroll/ContctsScroll.css';

const Scroll = (props) => {
    return (
        <div className="Scroll__container">
            {props.children}
        </div>
    );
}

export default Scroll;