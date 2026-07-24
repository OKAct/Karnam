import {BrowserRouter,Routes,Route} from "react-router-dom";
import Application from './mainPage/Application.jsx';
import Login from './loginpage/Login.jsx';

function App() {

  return (
    <>
    
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<Application/>}/>
    <Route path="/chat" element={<Application/>}/>
    <Route path="/login" element={<Login/>}/>

    </Routes>

    </BrowserRouter>

    </>
  )
}

export default App


