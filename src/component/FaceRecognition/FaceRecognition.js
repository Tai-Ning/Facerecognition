import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({imageUrl,box}) =>{
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="image" src={imageUrl} alt="" width="500px" height="auto"/>
                {box.map((boundingBox,index)=>{
                    return(
                    <div key={index} className="bounding-box" style={{top:boundingBox.topRow,bottom:boundingBox.botRow,left:boundingBox.leftcol,right:boundingBox.rgtcol}}></div>
                    )
                })}
            </div>
        </div>
    )
}


export default FaceRecognition