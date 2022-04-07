import './App.css';
import { Routes, Route } from "react-router-dom";
import UserStatus from "./components/UserStatus";
import AuthenProvider from "./AuthenProvider";
import RequiredAuthenWrapper from './components/RequiredAuthenWrapper';
import Default from "./Default";
import Login from "./Login";
import User from "./UserInfo";
function App() {
  return (
    <AuthenProvider>
      <div className="App">
        <UserStatus />
        <p>Welcome</p>
        <Routes>
          <Route path="/" element={<Default />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<RequiredAuthenWrapper><User /></RequiredAuthenWrapper>} />
        </Routes>
      </div>
    </AuthenProvider>
  );
}

export default App;
