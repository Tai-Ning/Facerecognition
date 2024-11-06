import './App.css';
import React,{Component} from 'react';
import Navigation from './component/Navigation/Navigation'
import Signin from './component/Signin/Signin'
import Register from './component/Register/Register';
import Logo from './component/Logo/Logo'
import Rank from './component/Rank/Rank'
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './component/FaceRecognition/FaceRecognition'
//背景套件
import ParticlesBg from 'particles-bg'


//設定初始狀態變數,才可以在每次登出後將狀態回歸原貌
const initialState = {
      inputUrl:"",
      imageUrl:"",
      box:[],
      route:"signin",
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }


class App extends Component{
    state = initialState

  //user profile更新  
  loadUser = (data) => {
    this.setState({
      user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
      }
    })
  }


  // input輸入內容的事件:改變input內容
  addImgeUrl = (event) => {
    this.setState({inputUrl:event.target.value})
    return this.state.inputUrl
  }  
 

  //圖片網址submit事件:顯示照片、載入人臉辨識(API)
  onSubmit = () => {
    this.setState({imageUrl:this.state.inputUrl})
    fetch('https://facerecogntionbrain-server.onrender.com/imageurl',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            inputUrl:this.state.inputUrl,
          })
        })
    .then(response => response.json())
    .then(data=>{
      this.showBoundingBox(this.boundingBox(data))
      if(data){
      fetch('https://facerecogntionbrain-server.onrender.com/image',{
        method:'put',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          id:this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count=>{
        this.setState(Object.assign(this.state.user,{entries:count}))
      })
      .catch(err=>console.log('API result fail',err))
      } 
    })
    .catch(err=>console.log('Error in first fetch:', err))
  }
  
  //人臉辨識方框
  boundingBox = (response) => {
    //input圖片長寬資訊
    const image = document.getElementById("image")
    //記得屬性值是字串所以要轉成數字
    const width=Number(image.width)
    const height=Number(image.height)
    //為避免未偵測人臉或是API返回有問題,先檢測response是否為陣列
    const region=response.outputs[0]?.data?.regions
    if(!region || !Array.isArray(region)){
      console.log("API can't recognition face.")
      //因後續使用陣列method回傳空陣列以免程式碼出現錯誤
      return []
    }
    return region.map(region=>{
              const location = region.region_info.bounding_box
              return{
                      botRow:height-(height*location.bottom_row),
                      leftcol:width*location.left_col,
                      rgtcol:width-(width*location.right_col),
                      topRow:height*location.top_row
                    }
            })
  }

  //將人臉辨識方框加到state:box中
  showBoundingBox = (boxes) =>{
    this.setState({box:boxes})
  }

  //改變route狀態
  onRouteChange = (route) => {
    if(route==="home"){
      this.setState({isSignedIn:true})
    }else if(route==="signout"){
      //確保每次不同使用者登入會將user重整
      //state=一個變數時,可以直接在setState({})中設定改變內容
      this.setState({initialState})
    }
    this.setState({route:route})
  }


  render(){
    const {imageUrl,box,route,isSignedIn,user} = this.state
    return(
      <div className="App">
        <ParticlesBg className="ParticlesBg" type="polygon"  bg={true} />
        <div className="content">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
            {
            route==="home" ? 
            <div>
              <Logo/>
              <Rank userName={user.name} userEntries={user.entries}/>
              <ImageLinkForm addInput={this.addImgeUrl} onSubmit={this.onSubmit}/>
              <FaceRecognition imageUrl={imageUrl} box={box}/>
            </div>
            :(
             route==="signin" ? 
             <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>:
             <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
            }
        </div>
      </div>
    )
  }
}


export default App;
