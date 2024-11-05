import React from "react";
class Register extends React.Component  {
    constructor(props){
        super(props)
        this.state={
            registerName:'',
            registerEmail:'',
            registerPassword:''
        }
    }
    onNameChange=(event)=>{
        this.setState({registerName:event.target.value})
    }
    onEmailChange=(event)=>{
        this.setState({registerEmail:event.target.value})
    }
    onPasswordChange=(event)=>{
        this.setState({registerPassword:event.target.value})
    }

    onSubitRegister=()=>{
        fetch('https://facerecogntionbrain-server.onrender.com/register',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:this.state.registerName,
                    email:this.state.registerEmail,
                    password:this.state.registerPassword
                })
            }   
        )
        .then(response=>response.json())
        //因server端的register設定回傳user
        .then(user=>{
            //想將此user的profile更新到前端,必須增加app.js state
            //使用use.id非user因如果為空值{}user就會為true;但use.id就為undefined,為false
            if(user.id){
                //從父元件傳遞來的方法透過props傳遞到子元件
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
        .catch(err=>{console.log('fail to update user profile')}) 
    }

    render(){
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" onClick={this.onSubitRegister} value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        )
    }    
}

export default Register