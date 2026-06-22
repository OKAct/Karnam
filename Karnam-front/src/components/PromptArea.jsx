

const PromptArea=({GetText})=>{

  return(


    <textarea className="chatarea" onChange={GetText}></textarea>
  );
};

export default PromptArea


