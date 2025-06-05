import React , {useState , useRef} from 'react'
import {getAuth , signInWithEmailAndPassword,signInWithPopup ,GoogleAuthProvider, GithubAuthProvider, signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth'
import{app} from '../Firebase'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const[email , setemail] = useState('')
    const[password , setpassword] = useState('')
    const[phone , setphone] = useState('');
    const recaptchaVerifier = useRef(null)
    const [isOTP , setisOTP] = useState(false)
    const [code , setcode] = useState('')
    const navigate = useNavigate()
    const submitHandler = (event)=>{
        event.preventDefault()
        const auth = getAuth(app)
        console.log('ohk done', email , password)
        signInWithEmailAndPassword(auth, email , password)
        .then(userData=>{
            console.log(userData.user)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const loginwithgoogle =()=>{
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth ,provider)
        .then(result=>{
            console.log(result)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })

    }
    
    const loginwithgithub =()=>{
        const auth = getAuth(app)
        const provider = new GithubAuthProvider()
        signInWithPopup(auth ,provider)
        .then(result=>{
            console.log(result)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })

    }

    const sendOTP =()=>{
        const auth = getAuth(app)
        if(!recaptchaVerifier.current){
            recaptchaVerifier.current = new RecaptchaVerifier( 'abc' ,{size: 'invisible'}, auth)
        }
        signInWithPhoneNumber(auth , phone , recaptchaVerifier)
        .then(res=>{
            console.log(res)
            window.confirmationResult = res
            console.log('OTP sent')
            setisOTP(true)
        
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const ConfirmOtp =()=>{
        window.confirmationResult.confirm(code)
        .then(res=>{
            console.log(res)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })
    }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit = {submitHandler}>
        <input onChange ={(e)=>{setemail(e.target.value)}} type = 'email' placeholder ='email'/>
        <input onChange ={(e)=>{setpassword(e.target.value)}} type = 'password' placeholder = 'password'/>
        <button type = 'submit'>Submit</button>
        <br/>   
        <br/>
        <button type ='button' onClick={loginwithgoogle}>login with Google </button>
        <br/>
        
        <button type ='button' onClick = {loginwithgithub} style={{ marginTop: '16px' }}>login with Github</button>   
        <br/>
        
        
          {!isOTP ? (
            <button
                type="button"
                onClick={() => setisOTP(true)}
                style={{ marginTop: '1rem' }}
            >
                Login with Phone
            </button>
            ) : (
            <div>
                <h3>Login with OTP</h3>
                <input
                onChange={e => setphone(e.target.value)}
                placeholder="phone number"
                />
                <div id="abc"></div>
                <button type="button" onClick={sendOTP}>
                Send OTP
                </button>
                <br />
                <h4>Confirm OTP</h4>
                <input
                type="text"
                onChange={e => setcode(e.target.value)}
                placeholder="Enter OTP"
                />
                <button type="button" onClick={ConfirmOtp}>
                Submit OTP
                </button>
                <br/>
                <br/>
                <button type="button" onClick={() => setisOTP(false)}>
                Cancel
                </button>
            </div>
            )} 
                </form>
                
                </div>
            )
            }

export default Login
