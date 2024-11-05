import React from "react";
//引入套件react-parallax-tilt
import Tilt from "react-parallax-tilt"
import "./Logo.css"
import brain from"./brain.png"

//className='shadow-2會改變寬度,故使用style設定'
const Logo = ()=>{
    return(
       <div className="ma4 mt0">
            <Tilt className="Tilt br2" tiltMaxAngleX={3} tiltMaxAngleY={3}>    
                <div className="Tilt-inner pa3" style={{ height: 150,width:150,boxShadow:"0px 0px 8px 2px rgba( 0, 0, 0, 0.2 )"}}>
                    <img src={brain} alt="logo" style={{paddingTop:"5px"}}/>
                </div>
            </Tilt>
       </div>
    )
}

export default Logo