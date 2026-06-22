
  const addMessage=(input_data,mes,setMessages)=>{
    
    setMessages(messages => [
      ...messages,
      { message:input_data,pro:mes ? false:true}
    ]);
  };

export default addMessage
