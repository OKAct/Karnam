import './App.css'
import Bubble from './components/Bubble.jsx'
import { useState } from 'react'
import SendButton from './components/SendButton'
import  PromptArea  from './components/PromptArea.jsx'
import Chat from './components/Chat.jsx'
import { getText,addMessage } from './components/handler.jsx'
import FileUpload from './components/FileUpload'
function App() {


  const [data,getData]=useState("");
  const [bool,updateBool]=useState([]);
  const [url,getUrl]=useState([]);
  const [messages ,setMessages]=useState([]);
  






  const stream=async (datas)=>{
    

    const response= await fetch("https://karnam.tail10621d.ts.net/chat",{

      method:"POST",

      headers:{"Content-Type":"application/json"},
      
      body:JSON.stringify({usermessage:datas})
    });

    const reader= response.body.getReader();
    
    const decoder = new TextDecoder();
    
     let ai_message="";


    addMessage(" ",false,setMessages);


    while(true){

      const { value , done }= await reader.read();
      if(done) break;


      ai_message+=decoder.decode(value);
      


      setMessages(prev=>
        prev.map((m,index)=>
          index===prev.length-1 ?{...m,message:ai_message}:m
        )
      );

      console.log(ai_message);

    }


  };
  


  return (
    <>
    
    <div className="box">

    <Chat chatMessages={messages}/>
  
    <div className="chatdiv">



    <PromptArea GetText={(e)=>{getText(e,getData)}}/>

    <FileUpload />

    <SendButton sentMessage={()=>addMessage(data,true,setMessages)} stream={()=>stream(data)}/>

    </div>


    </div>


    </>
  )
}

export default App

