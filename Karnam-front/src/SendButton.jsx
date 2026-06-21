
const SendButton=({sentMessage,stream})=>{

  return(

    <button className="send" onClick={async()=>{
      sentMessage();
      await stream(); 
    }}>⬆</button>
  );
}

export default SendButton
