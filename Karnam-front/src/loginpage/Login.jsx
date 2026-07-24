import './login.css';
import loginVerify from  "./handler.jsx";

import { useState,useRef,useEffect } from 'react'

const Login=()=>{


const [userInfo,updateInfo]=useState({
  name:"anand",
  password:"Tok"
});

const username=(uname)=>{

  updateInfo((name)=>({
    ...name,name:uname
  }));
}

const userPass=(password)=>{

  updateInfo((pass)=>({

    ...pass,password

  }));
  
}


  return(
    <>
    <div className="box">
    
    <div className="loginBox">
    
    <div className="loginAttributes">

    <div className="attribute">User Name</div>
    <input className="input"  onChange={(e)=>{
      username(e.target.value)
    }}
    />

    <div className="attribute">Password</div>
    <input className="input" onChange={(e)=>{
      userPass(e.target.value);
    }}/>
    </div>
    
    <button className="loginButton" onClick={(e)=>{

      loginVerify(userInfo.name,userInfo.password)  

    }} >Login</button>
    </div>

    </div>

    </>
    
  );
}
export default Login
