
  export const getText=(e,getData)=>{
  getData(e.target.value);
}


   export const addMessage=(input_data,mes,setMessages)=>{
    
    setMessages(messages => [
      ...messages,
      { message:input_data,pro:mes ? false:true}
    ]);
  };


