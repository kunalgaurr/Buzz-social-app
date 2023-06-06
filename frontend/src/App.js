import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Register/Register';
import { Home } from './Pages/Home/Home';
import { Explore } from './Pages/Explore/Explore';
import { News } from './Pages/News/News';
import { Community } from './Pages/Community/Community';
import { Profile } from './Pages/Profile/Profile';
import { PostPage } from './Pages/PostPage/PostPage';
import { EditProfile } from './Pages/EditProfile/EditProfile';
import { Setting } from './Pages/Setting/Setting';
import { Chat } from './Pages/Chat/Chat';
import { NewCommunity } from './Pages/NewCommunity/NewCommunity';

function App() {
  const user = localStorage.getItem('user');
  if (user) {
    return (
      <div id="app-container">
        <Routes>
          <Route path="/login" element={<Home />} />
          <Route path="/register" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/news" element={<News />} />
          <Route path="/community/post" element={<Community />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/post/:postId" element={<PostPage />} />
          <Route path="/profile/:userId/edit" element={<EditProfile />} />
          <Route path="/profile/:userId/settings" element={<Setting />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/community/new" element={<NewCommunity />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div id="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/explore" element={<Register />} />
          <Route path="/news" element={<Register />} />
          <Route path="/community/post" element={<Register />} />
          <Route path="/profile/:userId" element={<Login />} />
          <Route path="/profile/post/:postId" element={<Login />} />
          <Route path="/profile/:userId/edit" element={<Login />} />
          <Route path="/profile/:userId/settings" element={<Login />} />
          <Route path="/chat" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default App;
