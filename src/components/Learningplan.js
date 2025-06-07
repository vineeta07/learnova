import React ,{useEffect ,useState}from 'react'
import { Link, Outlet , } from 'react-router-dom'
import {app} from '../Firebase'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

import ChatIcon from './ChatIcon';
import Logo from '../images/Logo.png'; // Adjust the path to your logo image
import PfpChanger from './PfpChanger';


const Learningplan = () => {
    
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(()=>{
    const auth = getAuth(app)
    const unsubscribe= onAuthStateChanged(auth , (user)=>{
      if(user){
        console.log('yes login' , user)
      }
      else{
        console.log('not login')
      }
    })
    return ()=> unsubscribe();
  },[])


  return (
    <div>
       <div className="main">
      
    
   
    <div className="desktop" >
         
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
           <Link to="/dashboard" style={{ position: 'relative', zIndex: 10 }}>
                                         <img src={Logo} alt="Logo" style={{
                                            width: '200px',     /* Adjust as needed */
                                             marginLeft: '1.5rem',
                                             }} />
                                       </Link>
          <div className="rectangle" ></div>
          <img className="img" src="img/image.png" />
          <div className="text-wrapper"><Link to='/resources' style={{ color: 'black', display: 'block' }}>Resources</Link></div>
          <div className="div" style={{ backgroundColor:'rgb(232, 164, 210)'}}></div>
          <p className="welcome-back-buddy">
            <span className="span" style={{ color: 'rgb(246, 15, 27)' }} >Lets make a plan </span> <span className="text-wrapper-2">!</span>
          </p>
          <div className="rectangle-2"></div>
          <div className="rectangle-2"></div>
          <div className="rectangle-3"></div>
          <div className="rectangle-4"></div>
          <div className="rectangle-5">
            <div className="inside-rectangle-5"style={{
                marginTop: '750px',
              }}>
                <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_EzPrWM.json" background="transparent" speed="1" loop autoplay style={{ width: "100%", height: "100%" }}></lottie-player>
              </div>
          </div>
              
          <div className="text-wrapper-3"> 
            <Link to ='/dashboard' style ={{color:'black', display: 'block'}}>Dashboard</Link> </div>
          <div className="text-wrapper-4">  <Link to='/subject' style={{ color: 'black', display: 'block' }}>Subject</Link></div>
          <div className="rectangle-6"></div>
          <div className="text-wrapper-5"> <Link to='/learningplan' style={{ color: 'black', display: 'block' }}>Learning plan</Link>
          <br/>
          <br/>
        
          </div>
           
          <div className="rectangle-7">
             <ChatIcon />
          </div>

          
          <div className="rectangle-8"></div>
          <div className="rectangle-9"></div>
          <p className="p">Today's tasks
            <Outlet />
          </p>
          
          <div className="text-wrapper-7" >
                <Link to='/addtask' style={{ color: 'blue', display: 'block' }}> + add</Link>
          </div>
        
         
          <div className="rectangle-15"></div>
          <img className="polygon" src="img/polygon-1.svg" />
          <div className="rectangle-16"></div>
          <div className="rectangle-17"></div>
          <div className="rectangle-18"></div>
          <div className="rectangle-19"></div>
          
          <div className="rectangle-20">
            <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_iv4dsx3q.json" background="transparent" speed="1" loop autoplay style={{ width: "100%", height: "100%" }}></lottie-player></div>
          
          <div className="ellipse"></div>
          
          <div className="text-wrapper-15" style={{ margintop:'10px'}}><h4>LEARNING PLAN</h4></div>
      
          <div className="text-wrapper-16" style={{ 
            textAlign: 'right', padding: '10px', fontWeight: 'bold', fontSize: '1.1rem',
              background: 'rgb(148, 200, 232)', marginTop: '-20px',
              border: '2px solid #222', marginLeft:'-40px',
              borderRadius: '10px',
              color: '#111', // very dark text
              
              width: 'fit-content',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                      
            }}>
                {dateTime.toLocaleDateString('en-GB')} , {dateTime.toLocaleTimeString()}</div>
          <div className="text-wrapper-17"><u>To-do list
            
          </u>
          </div>
          <div className="text-wrapper-18">
             <Link to='/addtask' style={{ color: 'blue', display: 'block' }}> + add</Link>
          </div>
          <div className="rectangle-34"></div>
          
          <div className="rectangle-35"></div>
          <div className="rectangle-36"></div>
          <div className="rectangle-37"></div>
          <div className="rectangle-38"></div>
          <div className="text-wrapper-19">Task-1</div>
          <div className="text-wrapper-20">Task-2</div>
          <div className="text-wrapper-21">Task-3</div>
          <div className="text-wrapper-22">Task-4</div>
          <div className="text-wrapper-23">Task-5</div>
          <div className="text-wrapper-24"> complex analysis
            
          </div>
          <div className="text-wrapper-25">-programming fund.</div>
          <div className="text-wrapper-26">matlab prog.</div>
          
          <div className="text-wrapper-26">matlab prog.</div>
          <p className="python-prog">
            <span className="text-wrapper-27">python prog</span> <span className="text-wrapper-2">.</span>
          </p>
          <div className="text-wrapper-28">am-102.</div>
       
          
          
        
         
         
          <div className="ellipse-2">
            <PfpChanger/>
          </div>
          
          <p className="text-wrapper-29"><h2>i hope you will complete it  (૭ ｡•̀ ᵕ •́｡ )૭</h2></p>
          
        </div>
        
        </div>
        
    </div>
    </div>
    </div>
    
   
  )
}

export default Learningplan
