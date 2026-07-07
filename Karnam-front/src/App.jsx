import './App.css'
import Bubble from './components/Bubble.jsx'
import { useState,useRef,useEffect } from 'react'
import SendButton from './components/SendButton'
import PromptArea  from './components/PromptArea.jsx'
import Chat from './components/Chat.jsx'
import { getText,addMessage,getFile,returnFile,enterKey } from './components/handler.jsx'
import SettingButton from './components/SettingButton.jsx'
import SettingMenu from './components/SettingMenu.jsx'
import FileUpload from './components/FileUpload'



function App() {


  const [data,getData]=useState("");
  const [bool,updateBool]=useState([]);
  const [url,getUrl]=useState([]);
  const [messages ,setMessages]=useState([]);
  const [picUpload,updatePic]=useState(true);
  const [configVisibility,setVisibility]=useState(true);
  
  const [usersetting,setUserSetting]=useState({

    localAiBaseUrl:"https://karnam.tail10621d.ts.net/v1",
    apiKey:"ollama",
    aiModel:"gemma3:270m",
    temperature:"0.9",
  });

  const formData = useRef(new FormData());
  const scroll  =useRef(null);
  const textArea= useRef(null);
  const refSendButton=useRef(null); 

  useEffect(()=>{
   scroll.current.scrollIntoView({behavior:"smooth"}); 
  },[messages]);

  const stream=async (datas)=>{
    
    const userString =JSON.stringify({usermessage:datas,usersetting})

    console.log(userString);

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
    formData.current.delete("client");
  };
  


  return (
    <>
    
    <div className="box">

    <Chat chatMessages={messages} scrollRef={scroll}/>
  
    <SettingButton onClick={()=>{setVisibility(!configVisibility);}}></SettingButton>

    <SettingMenu hidden={configVisibility}></SettingMenu>

    <div className="chatdiv">

    <PromptArea GetText={(e)=>{getText(e,getData);}} onDragOver={(e)=>{getFile(e);updatePic(false);}} onDrop={(e)=>{returnFile(e,formData);updatePic(true)}} onDragLeave={(e)=>{updatePic(true)}} onUpload={picUpload} ref={textArea} 


    onKeyPress={(e)=>{
      if(e.key==="Enter"){
        refSendButton.current.click();
      }

    }}

    />

    <SendButton sentMessage={()=>{
      addMessage(data,true,setMessages)
        textArea.current.value="";
    }} stream={()=>stream(data)} ref={refSendButton}/>


    <FileUpload/>


    </div>


    </div>


    </>
  )
}

export default App

