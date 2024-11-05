import React from "react";

const Navigation = ({onRouteChange,isSignedIn})=>{
    //在登入後的時候顯示sign out；登入前顯示sign in 和 Register
    if(isSignedIn){
     return(
        <nav style={{display:"flex",justifyContent:"flex-end"}}>
              <nav style={{display:"flex",justifyContent:"flex-end"}}>
                <p onClick={()=>onRouteChange("signout")} className="f3 link dim black underline pa3 pointer ">Sign Out</p>
            </nav>
        </nav>
    )   
    }else{
        return( 
             <nav style={{display:"flex",justifyContent:"flex-end"}}>
            <p onClick={()=>onRouteChange("signin")} className="f3 link dim black underline pa3 pointer ">Sign In</p>
            <p onClick={()=>onRouteChange("register")} className="f3 link dim black underline pa3 pointer ">Register</p>
            </nav>
        )
    }
}

export default Navigation