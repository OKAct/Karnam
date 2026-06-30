
import Markdown from 'react-markdown'

const Bubble=(props)=>{


  return(

    props.pro ?
    <div className="bubble">
    <span className="bub_text">
    <Markdown >{props.message}</Markdown>
    </span>
    </div>
    :
    <div className="bubble1">
    <span className="bub_text">
    <Markdown >{props.message}</Markdown>
    </span>
    </div>
  );
  
};
export default Bubble
