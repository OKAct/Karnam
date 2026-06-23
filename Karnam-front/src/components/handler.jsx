
  export const getText=(e,getData)=>{
  getData(e.target.value);
}


   export const addMessage=(input_data,mes,setMessages)=>{
    
    setMessages(messages => [
      ...messages,
      { message:input_data,pro:mes ? false:true}
    ]);
  };

  
export const getFile=(e)=>{
  e.preventDefault();
}

export const returnFile=(e,formData)=>{

  e.preventDefault();
  console.log("hello");
  const file= e.dataTransfer.files;

  formData.append("img",file);
}


