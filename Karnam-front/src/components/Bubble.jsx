


const Bubble=(props)=>{

  return(

    props.pro ?
    <div className="bubble">
    <span className="bub_text">{props.message}</span>
    </div>
    :
    <div className="bubble1">
    <span className="bub_text">{props.message}</span>
    </div>
  );
  
};
export default Bubble
