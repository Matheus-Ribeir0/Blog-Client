import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import {AuthContext} from './helpers/AuthContext'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({username: "", id: 0, status: false})

  useEffect(() => {
    axios
      .get("https://blog-sever-n5qt.onrender.com/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);
//authState .getItem('accessToken')

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({username: "", id: 0, status: false})
    window.location.reload();
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <div className='navbar'>
          {!authState.status ? (
            <>
              <div>
                <Link to="/login"> Login </Link>
                <Link to="/registration"> Registration </Link>
              </div>
              
            </>
          ) : (
            <>
            <div>
              <Link to="/"> Home Page</Link>
              <Link to="/createpost"> Create a Post</Link>
            </div>
              
              <div className='heather_container'>
                <button className='logout' onClick={logout}> Logout</button>
                <Link to={`/profile/${authState.id}`} className='username'>{authState.username}</Link>
              </div>
              
            </>
          )}
            
        </div>
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/createpost"  element={<CreatePost/>}/>
          <Route path="/post/:id"  element={<Post/>}/>
          <Route path="/registration"  element={<Registration/>}/>
          <Route path="/login"  element={<Login/>}/>
          <Route path="/profile/:id"  element={<Profile/>}/>
          <Route path="/changepassword"  element={<ChangePassword/>}/>
          <Route path="*" exactt Component={PageNotFound}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
