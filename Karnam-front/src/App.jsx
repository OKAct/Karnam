import './App.css'
import Bubble from './components/Bubble.jsx'
import { useState } from 'react'
import SendButton from './components/SendButton'
import  PromptArea  from './components/PromptArea.jsx'
import Chat from './components/Chat.jsx'
import { getText,addMessage,getFile,returnFile } from './components/handler.jsx'
import FileUpload from './components/FileUpload'
import { useRef } from 'react'


function App() {


  const [data,getData]=useState("");
  const [bool,updateBool]=useState([]);
  const [url,getUrl]=useState([]);
  const [messages ,setMessages]=useState([]);
  const [bl,updatebl]=useState(true);
  


  const formData = useRef(new FormData());


  const stream=async (datas)=>{
    
    const userString =JSON.stringify({usermessage:datas})

    formData.current.append("client",

      new Blob([userString], {type:"application/json"})

      );
    console.log(formData);

    const response= await fetch("https://mypc.tail10621d.ts.net/chat",{

      method:"POST",

      body:formData.current
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

    <PromptArea GetText={(e)=>{getText(e,getData);}} onDragOver={(e)=>{getFile(e);updatebl(false);}} onDrop={(e)=>{returnFile(e,formData);updatebl(true)}} onDragLeave={(e)=>{updatebl(true)}} me={bl}/>

    <SendButton sentMessage={()=>addMessage(data,true,setMessages)} stream={()=>stream(data)}/>
    <FileUpload/>


    </div>


    </div>


    </>
  )
}

export default App

