import Bubble from './Bubble.jsx'


const Chat=({chatMessages})=>{

  return (
    <div className="chat">

    {chatMessages.map((msg,index)=>(

      <Bubble key={index} message={msg.message} pro={msg.pro}/>

    ))}

    </div>
  );
}
export default Chat
