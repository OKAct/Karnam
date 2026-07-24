
const SendButton=({sentMessage,stream,ref})=>{

  return(

    <button className="send" onClick={async()=>{
      sentMessage();
      await stream(); 
    }} ref={ref}>⬆</button>
  );
}

export default SendButton
