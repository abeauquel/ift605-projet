import './App.css';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Stats from './Stats';
import Training from './Training';
import Friend from './Friend';
import Coach from './Coach';
import Coaching from './Coaching';
import Cookies from 'universal-cookie';
import 'react-notifications/lib/notifications.css';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiUrl from './Constants';

const cookies = new Cookies();

function IsLoggedIn() {
  return cookies.get('user') !== undefined;
}

function App() {
  let navigate = useNavigate();
  let isLoggedIn = IsLoggedIn();
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          {!isLoggedIn && <Route path="/" element={<LoginForm apiUrl={ApiUrl} navigate={navigate}/>}/>}
          {isLoggedIn && <Route path="/" element={<Stats apiUrl={ApiUrl} navigate={navigate}/>}/>}
          {!isLoggedIn && <Route path="/login" element={<LoginForm apiUrl={ApiUrl} navigate={navigate}/>}/>}
          {!isLoggedIn && <Route path="/login/signUpSuccess" element={<LoginForm apiUrl={ApiUrl} signUpSuccess={true} navigate={navigate}/>}/>}
          {!isLoggedIn && <Route path="/signup" element={<SignUp apiUrl={ApiUrl} navigate={navigate}/>}/>}
          {isLoggedIn && <Route path="/stats" element={<Stats apiUrl={ApiUrl} navigate={navigate}/>}/>}
          {isLoggedIn && <Route path="/training" element={<Training apiUrl={ApiUrl} navigate={navigate}/>}/>}
          {isLoggedIn && <Route path="/friend" element={<Friend apiUrl={ApiUrl} navigate={navigate}/>}/>}
          {isLoggedIn && <Route path="/coach" element={<Coach apiUrl={ApiUrl} navigate={navigate}/>}/>}
          {isLoggedIn && <Route path="/coaching" element={<Coaching apiUrl={ApiUrl} navigate={navigate}/>}/>}
        </Routes>
      </header>
    </div>
  );
}

export default App;
