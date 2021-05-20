import React, {Component} from 'react';
import fire from '../config/firebaseConfig';
import './Main.css';
import Login from './forms/Login';
import Register from './forms/Register';
import Tracker from './tracker/Tracker';
import Spinner from '../assets/loader.gif';



class Main extends Component{


    state={
        user: 1,
        loading: true,
        formSwitcher: false
    }

    
    componentDidMount(){
        this.authListner();
    }

    authListner(){
       fire.auth().onAuthStateChanged((user) =>{
           if(user){
               this.setState({user});
           }else{
            this.setState({user:null});
           }
       });
    }


    formSwitcher = (action) => {
        this.setState({
            formSwitcher: action === 'register' ? true : false
        })
        //console.log(action);
    }

    render(){

        const form = !this.state.formSwitcher ? <Login/> : <Register/>
        if(this.state.user === 1){
            return(
                <div className="mainBlock">
                <div className="Spinner">
                <img src={Spinner} alt="Spinner" className="ImgSpinner"/>
                </div>
                </div>
            )
        }

        return(
            <div>
            {!this.state.user ?
                (<div className="mainBlock">
                {form}

                {!this.state.formSwitcher ?
                    (<span className="underLine">
                    Not Registered? <button 
                    onClick={()=>this.formSwitcher(!this.state.formSwitcher? 'register': 'login')} 
                    className="linkBtn">Create an account</button>
                    </span>) :

                    (<span className="underLine">
                    Have an account? <button 
                    onClick={()=>this.formSwitcher(!this.state.formSwitcher? 'register': 'login')} 
                    className="linkBtn">Sign in here</button>
                    </span>)
                }
                </div>) : (<Tracker/>)

            }
            
            </div>
        )
    }
}


export default Main;