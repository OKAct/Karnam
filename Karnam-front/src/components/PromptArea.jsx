

const PromptArea=({GetText,onDragOver,onDrop,me,onDragLeave})=>{


  return(

    me?(
    <textarea className="chatarea" onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragLeave} placeholder="Ask anything" onChange={GetText} ></textarea>
    )
    :
    <>
    <textarea className="chatarea"  onDrop={onDrop} onDragLeave={onDragLeave} onChange={GetText}></textarea>
    <div className="chatarea_on_upload" onDrop={onDrop} onDragLeave={onDragLeave} onDragOver={onDragOver}> Upload</div>


    </>
  );
};

export default PromptArea


