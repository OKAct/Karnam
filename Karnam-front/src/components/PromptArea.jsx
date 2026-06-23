

const getFile=(e)=>{
  e.preventDefault();
};


const returnFile=(e)=>{
  e.preventDefault();
 
  const files=e.dataTransfer.files;
};

const PromptArea=({GetText})=>{

  return(
    <textarea className="chatarea" onDragOver={getFile} onDrop={returnFile} placeholder="Ask anything" onChange={GetText}></textarea>
  );
};

export default PromptArea


