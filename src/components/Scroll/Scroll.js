
const Scroll = (props) => {
    return (
        <div style={{ overflowY: 'scroll', height: '80vh', width: '100%' }}>
            {props.children}
        </div>
    );
}

export default Scroll;