import './styles/Styles.css';
import { Outlet } from 'react-router-dom'
import { useState} from 'react'
import { UserContext } from './components/Pages/UserContext'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  //eEffect(() => {
  //const savedUser = localStorage.getItem('user');
  //if (savedUser) {
  //  setUser (JSON.parse(savedUser));
  //}
  // []);

  //eEffect(() => {
  //if (user) {
  //  localStorage.setItem('user', JSON.stringify(user));
  //} else {
  //  localStorage.removeItem('user');
  //}
  //}, [user]);

  //const handleLogin = (newUser) => {
  //  setUser(newUser);
  //};

  //const handleLogout = () => {
  //  setUser(null);
  //}

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Outlet />
      </div>
    </UserContext.Provider>
  )
}

export default App
