import './SearchContcts.css';


const SearchContcts = () => {
    return(
        <div className='searchContcts__container'>
            <input type="text" className="searchContcts__input" placeholder="Find your friends" />
            <button className="searchBar__button">search</button>
        </div>
    );
}

export default SearchContcts;