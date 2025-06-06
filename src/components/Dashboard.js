import React ,{useEffect} from 'react' 
import {Link, Outlet} from 'react-router-dom'
import './Dashboard.css';
import {app} from '../Firebase'
import {getAuth, signOut, onAuthStateChanged} from 'firebase/auth'
import{ useNavigate } from 'react-router-dom'
// import Chatbot from './Chatbot';
import ChatIcon from './ChatIcon';

import Logo from '../images/Logo.png'; // Adjust the path to your logo image

const Dashboard = () => {
  const navigate = useNavigate('')
  const Logout =()=>{
    const auth = getAuth(app)
    signOut(auth).then(res=>{
      navigate('/login')
    })
  }

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
       
      <div className="main">
      {/* <div className="sidebar">
               <Link to='/dashboard/studentlist' style={{ color: 'blue', display: 'block' }}>student list</Link>
        <Link to='/dashboard/addfaculty' style={{ color: 'blue', display: 'block' }}>add faculty</Link>
        <Link to='/dashboard/facultylist' style={{ color: 'blue', display: 'block' }}>faculty list</Link>
      </div>
     */}
    
        
    <div className="desktop" >
         
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div>
            <Link to="/dashboard">
              <img src={Logo} alt="Logo" className="logo-img" />
            </Link></div>
          <div className="rectangle" ></div>
          <img className="img" src="img/rectangle-3.png" />
          <div className="text-wrapper"><Link to='/resources' style={{ color: 'black', display: 'block' }}>Resources</Link></div>
          <div className="div" style={{ backgroundColor: 'lightblue' }}></div>
          <p className="welcome-back-buddy">
            <span className="span" style={{ color: '#00008B' }} >Welcome back, buddy</span> <span className="text-wrapper-2">:)</span>
          </p>
          <div className="rectangle-2"></div>
          <div className="rectangle-2"></div>
          <div className="rectangle-3"></div>
          <div className="rectangle-4"></div>
          <div className="rectangle-5">
              <div className="inside-rectangle-5">
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
            <button type='button' onClick={Logout} style ={ {color: 'purple',
               width: '130px',      // Set the width you want
                padding: '10px',   // Optional: makes the button taller
               fontSize: '1.1rem',
               fontWeight: 'bold',  
             }}>Log Out</button>
          </div>
          <div className="rectangle-7">
                  
                   {/* Your dashboard layout */}
                  <ChatIcon />
                  </div>
                  
          
          <div className="rectangle-8"></div>
          <div className="rectangle-9"></div>
          <p className="p">time spend on learning :</p>
          <div className="text-wrapper-6">fri</div>
          <div className="text-wrapper-7">sat</div>
          <div className="rectangle-10"></div>
          <div className="rectangle-11"></div>
          <div className="rectangle-12"></div>
          <div className="rectangle-13"></div>
          <div className="rectangle-14"></div>
          <div className="rectangle-15"></div>
          <img className="polygon" src="img/polygon-1.svg" />
          <div className="rectangle-16"></div>
          <div className="rectangle-17"></div>
          <div className="rectangle-18"></div>
          <div className="rectangle-19"></div>
          <div className="rectangle-20">
            <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_iv4dsx3q.json" background="transparent" speed="1" loop autoplay style={{ width: "100%", height: "100%" }}></lottie-player></div>
          {/* <div className="ellipse"></div> */}
          <div className="rectangle-21"></div>
          <div className="rectangle-22"></div>
          <div className="rectangle-23"></div>
          <div className="rectangle-23"></div>
          <div className="rectangle-24"></div>
          <div className="rectangle-25"></div>
          <div className="rectangle-26"></div>
          <div className="rectangle-27"></div>
          <div className="rectangle-28"></div>
          <div className="rectangle-29"></div>
          <div className="text-wrapper-8">mon</div>
          <div className="text-wrapper-9">tues</div>
          <div className="text-wrapper-10">wed</div>
          <div className="text-wrapper-11">thurs</div>
          <div className="rectangle-30"></div>
          <div className="text-wrapper-12">subject1</div>
          <div className="rectangle-31"></div>
          <div className="text-wrapper-13">subject2</div>
          <div className="rectangle-32"></div>
          <div className="text-wrapper-14">subject 3</div>
          <div className="text-wrapper-15"><h4>DASHBOARD</h4></div>   
          <div className="rectangle-33"></div>
          <div className="text-wrapper-16">date,day</div>
          <div className="text-wrapper-17">latest result</div>
          <div className="text-wrapper-18">more</div>
          <div className="rectangle-34"></div>
          <div className="rectangle-35"></div>
          <div className="rectangle-36"></div>
          <div className="rectangle-37"></div>
          <div className="rectangle-38"></div>
          <div className="text-wrapper-19">unit-2</div>
          <div className="text-wrapper-20">unit-5</div>
          <div className="text-wrapper-21">unit-1</div>
          <div className="text-wrapper-22">unit-4</div>
          <div className="text-wrapper-23">unit-3</div>
          <div className="text-wrapper-24">-complex analysis</div>
          <div className="text-wrapper-25">-programming fund.</div>
          <div className="text-wrapper-26">matlab prog.</div>
          <div className="text-wrapper-26">matlab prog.</div>
          <p className="python-prog">
            <span className="text-wrapper-27">python prog</span> <span className="text-wrapper-2">.</span>
          </p>
          <div className="text-wrapper-28">am-102.</div>
          <div className="rectangle-39"></div>
          <div className="rectangle-40"></div>
          <div className="rectangle-41"></div>
          <div className="rectangle-42"></div>
          <div className="rectangle-43"></div>
          <div className="rectangle-44"></div>
          <div className="rectangle-45"></div>
          <div className="rectangle-46"></div>
          <div className="rectangle-47"></div>
          <div className="rectangle-48"></div>
          <div className="ellipse-2"></div>
          <p className="text-wrapper-29"><h2>you learned ----hrs and -----questions this week</h2></p>
          <img className="profile" src="img/profile.svg" />
           </div>
        
        </div>
     
    
    {/* <div style ={{display:'flex', flexDirection :'row'}}>
    <div style ={{width :'20%', backgroundColor:'royalblue', height:'100vh'}}> 
       
      
      <Link to ='/dashboard/studentlist' style ={{color:'white', display: 'block'}}>student list</Link>
      <Link to ='/dashboard/addfaculty' style ={{color:'white', display: 'block'}}>add faculty</Link>
      <Link to ='/dashboard/facultylist' style ={{color:'white', display: 'block'}}>faculty list</Link>
    </div>
    <div style ={{width :'80%', backgroundColor:'lightgray', height:'100vh'}}>
        <Outlet/>
    </div>
    </div> */}
      
      
    </div>
    </div>
  
  )
}

export default Dashboard
