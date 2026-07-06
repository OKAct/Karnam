import Bubble from './Bubble.jsx'


const Chat=({chatMessages,scrollRef})=>{

  return (
    <div className="chat">

    {chatMessages.map((msg,index)=>(

      <Bubble key={index} message={msg.message} pro={msg.pro}/>

    ))}

    <div ref={scrollRef}></div>
    </div>
  );
}
export default Chat
