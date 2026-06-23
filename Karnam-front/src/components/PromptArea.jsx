

const PromptArea=({GetText,onDragOver,onDrop})=>{

  return(
    <textarea className="chatarea" onDragOver={onDragOver} onDrop={onDrop} placeholder="Ask anything" onChange={GetText}></textarea>
  );
};

export default PromptArea


