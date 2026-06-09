import './App.css'
import Bubble from './Bubble.jsx'
import { useState } from 'react'
 


function App() {


  const [data,getData]=useState("");
  const [bool,updateBool]=useState([]);
  const [url,getUrl]=useState([]);

  const gettext=(e)=>{
    console.log("worked");
    getData(e.target.value)
  };

  const addMessag=(input_data,mes)=>{
    
    setMessages(messages => [
      ...messages,
      { message:input_data,pro:mes ? false:true}
    ]);
    

  };


  const fet= async ()=>{

    const ai_json= await fetch("https://httpbin.org/post",{


      method:"POST",
      headers:{

        "Content-Type":"text/plain"
      },
      body:data
    });
    
    if(ai_json.ok){
    const ai_message = await ai_json.json();
    addMessag(ai_message.data,false);
     }

  };
  
  
  
  const [messages ,setMessages]=useState([]);

  return (
    <>
    
    <div className="box">

    <div className="chat">
    
    {messages.map((msg,index)=>(
      <Bubble key={index} message={msg.message} pro={msg.pro}/>
    ))}

    </div>
    
    <div className="chatdiv">
    <textarea className="chatarea" onChange={gettext}>
    </textarea>
    <button className="send" onClick={async ()=>{
      addMessag(data,true);
      await fet();
    }}>⬆</button>

    
    </div>


    </div>


    </>
  )
}

export default App
