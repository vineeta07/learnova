import React , {useState , useRef} from 'react'
import {getAuth , linkWithCredential , signInWithEmailAndPassword,signInWithPopup ,GoogleAuthProvider, GithubAuthProvider, signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth'
import{app} from '../Firebase'
import {useNavigate} from 'react-router-dom'
import './Login.css';


const Login = () => {
    const[email , setemail] = useState('')
    const[password , setpassword] = useState('')
    const[phone , setphone] = useState('');
    const recaptchaVerifier = useRef(null)
    const [isOTP , setisOTP] = useState(false)
    const [code , setcode] = useState('')
    const [pendingCred, setPendingCred] = useState(null);
    const [pendingEmail, setPendingEmail] = useState(''); // For storing pending credential
    const navigate = useNavigate()
    const submitHandler = (event)=>{
        event.preventDefault()
        const auth = getAuth(app)
        console.log('ohk done', email , password)
        signInWithEmailAndPassword(auth, email , password)
        .then(userData=>{
            console.log(userData.user)
            if (pendingCred) {
        linkWithCredential(userData.user, pendingCred)
          .then(() => {
            alert('Accounts linked! You can now log in with Google.');
            setPendingCred(null); // Clear pending credential
            navigate('/dashboard');
          })
          .catch(linkErr => {
            console.log('Link error:', linkErr);
            navigate('/dashboard');
          });
      } else {
        navigate('/dashboard');
      }
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
        .catch(async err => {
      if (err.code === 'auth/account-exists-with-different-credential') {
        // Get the pending Google credential
        const cred = GoogleAuthProvider.credentialFromError(err);
            setPendingCred(cred); // <-- Store in state
            setPendingEmail(err.customData.email); // Store the email for later use
        // Fetch sign-in methods for this email
        const methods = await auth.fetchSignInMethodsForEmail(email);
        alert(
          `An account already exists with the email ${email} using ${methods[0]}. Please log in with that method, then you can link Google from your profile settings.`
        );
        // Optionally, store pendingCred somewhere (e.g., in state) for linking after login
      } else {
        console.log(err);
      }
    });
    }
    
    const loginwithgithub =()=>{
        const auth = getAuth(app)
        const provider = new GithubAuthProvider()
        signInWithPopup(auth ,provider)
        .then(result=>{
            console.log(result)
            navigate('/dashboard')
        })
        .catch(async err => {
      if (err.code === 'auth/account-exists-with-different-credential') {
        // Get the pending Google credential
        const cred = GithubAuthProvider.credentialFromError(err);
        setPendingCred(cred);
        setPendingEmail(err.customData.email);
        alert(
          `An account already exists with the email ${err.customData.email}. Please log in with your original method to link Github.`
        );
      } else {
        console.log(err);
      }
    });

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
    <div className='Background'>
    <div className='login_page'>
      <h1>Login</h1>
      <form onSubmit = {submitHandler} className='login_form'>
        <input onChange ={(e)=>{setemail(e.target.value)}} type = 'email' placeholder ='email'  className='input_box'/>
        <br/>
        <input onChange ={(e)=>{setpassword(e.target.value)}} type = 'password' placeholder = 'password' className='input_box'/>
        <br/>
        <button type = 'submit' className='Submit_button' >Submit</button>
        <br/>   
        <br/>
        <button type ='button' onClick={loginwithgoogle} className='login_through'>login with Google </button>
        <button type ='button' onClick = {loginwithgithub}  className='login_through'>login with Github</button>   
        
        
        
          {!isOTP ? (
            <button
                type="button"
                onClick={() => setisOTP(true)}
                className='login_through'
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
                </div>
            )
            }

export default Login
