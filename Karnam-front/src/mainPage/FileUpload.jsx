
import { useRef } from 'react';

const FileUpload=()=>{
  
  const fileref= useRef(null);

  const handupload=()=>{

    fileref.current.click();
  };

  return(
    
    <>
    <input  type="file" ref={fileref} hidden/>
    <button className="file_input" onClick={handupload}>+</button>
    </>

  );

};


export  default FileUpload
