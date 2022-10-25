import NavChatApp from '../components/Navbar/Navbar';
import Contacts from '../components/contacts/contacts';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <NavChatApp />
      <div>
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
