
const SendButton=({message,stream})=>{

  return(

    <button className="send" onClick={async()=>{
      message();
      await stream(); 
    }}>⬆</button>
  );
}

export default SendButton
