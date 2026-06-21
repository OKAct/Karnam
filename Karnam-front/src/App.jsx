import './App.css'
import Bubble from './Bubble.jsx'
import { useState } from 'react'
import SendButton from './SendButton'
import PromptArea from './PromptArea.jsx'
import Chat from './Chat.jsx'
function App() {


  const [data,getData]=useState("");
  const [bool,updateBool]=useState([]);
  const [url,getUrl]=useState([]);
  const [messages ,setMessages]=useState([]);
  

  const getText=(e)=>{
    getData(e.target.value)
  };

  const addMessag=(input_data,mes)=>{
    
    setMessages(messages => [
      ...messages,
      { message:input_data,pro:mes ? false:true}
    ]);
    

  };




  const stream=async (datas)=>{
    const response= await fetch("https://karnam.tail10621d.ts.net/chat",{

      method:"POST",

      headers:{"Content-Type":"application/json"},
      
      body:JSON.stringify({usermessage:datas})
    });

    const reader= response.body.getReader();
    
    const decoder = new TextDecoder();
    
     let ai_message="";


    addMessag(" ",false);


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

    <PromptArea GetText={getText}/>

    <SendButton sentMessage={()=>addMessag(data,true)} stream={()=>stream(data)}/>
    </div>


    </div>


    </>
  )
}

export default App
