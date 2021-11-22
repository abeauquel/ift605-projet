import './App.css';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Stats from './Stats';
import Cookies from 'universal-cookie';
import 'react-notifications/lib/notifications.css';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

function GetApiUrl() {
  switch(process.env.NODE_ENV) {
    case 'production':
      return 'https://prod.com';
    case 'development':
    default:
      return 'http://127.0.0.1:8081';
  }
}

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
          {!isLoggedIn && <Route path="/" element={<LoginForm apiUrl={GetApiUrl()} navigate={navigate}/>}/>}
          {isLoggedIn && <Route path="/" element={<Stats apiUrl={GetApiUrl()} navigate={navigate}/>}/>}
          {!isLoggedIn && <Route path="/login" element={<LoginForm apiUrl={GetApiUrl()} navigate={navigate}/>}/>}
          {!isLoggedIn && <Route path="/login/signUpSuccess" element={<LoginForm apiUrl={GetApiUrl()} signUpSuccess={true} navigate={navigate}/>}/>}
          {!isLoggedIn && <Route path="/signup" element={<SignUp apiUrl={GetApiUrl()} navigate={navigate}/>}/>}
          {isLoggedIn && <Route path="/stats" element={<Stats apiUrl={GetApiUrl()} navigate={navigate}/>}/>}
        </Routes>
      </header>
    </div>
  );
}

export default App;
