import React,{Component} from "react";
//設定Signin路由必須改成class Component以便設定state
class Signin extends Component{
    constructor(props){
        super(props)
        this.state={
            signInEmail:'',
            signInPassword:''
        }
    }
    //在input填寫Email時觸發函式
    onEmailChange=(event)=>{
        this.setState({signInEmail:event.target.value})
    }
    onPasswordChange=(event)=>{
        this.setState({signInPassword:event.target.value})
    }
    //按下submit觸發的路由->/signin 核對使用者信箱密碼是否正確
    //使用fetch預設是用GET所以要重新設定方法
    onSubitSignIn=()=>{
        fetch('https://facerecognition-ay0j.onrender.com/signin',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:this.state.signInEmail,
                password:this.state.signInPassword
            })
        })
        //設定連接成功時導向畫面路由
        .then(response=>response.json())
        .then(data=>{
            // if(data!=='error logging in')
            if(data.id){
                this.props.onRouteChange('home')
                this.props.loadUser(data)
            }
        })
        .catch(err=>{console.log('fail to logging in')})
    }

    render(){
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" onClick={this.onSubitSignIn}
                        
                        value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={()=>this.props.onRouteChange("register")} className="f6 link dim black db pointer">Register</p>
                    </div>
                 </div>
            </main>
        </article>
        )
    }
}

 
export default Signin