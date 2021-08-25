import './App.css';
import { Register } from '../src/pages/register/Register'
import { Home } from '../src/pages/home/Home'
import { Login } from '../src/pages/login/Login'
import { CreateProfile } from './pages/createProfile/CreateProfile';
import { EditProfile } from "./pages/editProfile/EditProfile"
import { Posts } from "./pages/posts/Posts"
import { Profile } from "./pages/profile/Profile"
import { Profiles } from './pages/profiles/Profiles';
import { Education } from './pages/education/Education';
import { Experience } from "./pages/experience/Experience";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { AuthProvider } from './context/authProvider';
import { ProfileProvider } from './context/profileProvider'
import { PrivateRoute } from "./HOC/PrivateRoute"
function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route exact path="/profiles">
              <Profiles />
            </Route>
            <Route exact path='/profile/:id'>
              <Profile />
            </Route>

            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/createProfile">
              <CreateProfile />
            </PrivateRoute>
            <PrivateRoute path="/editProfile">
              <EditProfile />
            </PrivateRoute>
            <PrivateRoute path="/posts">
              <Posts />
            </PrivateRoute>
            <PrivateRoute path="/education">
              <Education />
            </PrivateRoute>
            <PrivateRoute path="/experience">
              <Experience />
            </PrivateRoute>

          </Switch>
        </Router >
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
