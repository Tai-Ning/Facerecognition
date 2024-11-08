import React from "react";
import "./ImageLinkForm.css"


const ImageLinkForm = ({addInput,onSubmit})=>{
    return(
       <div className="">
          <p className="f3">This Magic Brain will detect faces in your pictures.Git it a try.</p>
          <div className="center">
            <div className="form center pa4 br3 shadow-5">
                <input type="text" className="f4 pa2 w-70 center" onChange={addInput}/>
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Submit</button>
            </div>    
          </div>  
       </div>
    )
}

export default ImageLinkForm