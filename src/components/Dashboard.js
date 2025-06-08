import React ,{useEffect ,useState} from 'react' 
import {Link, Outlet} from 'react-router-dom'
import './Dashboard.css';
import {app} from '../Firebase'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import{ useNavigate } from 'react-router-dom'
// import Chatbot from './Chatbot';
import ChatIcon from './ChatIcon';
import Pfpchanger from './PfpChanger';
import Logo from '../images/Logo.png'; // Adjust the path to your logo image
import Calendar from 'react-calendar';

const Dashboard = () => {

  const [dateTime, setDateTime] = useState(new Date());
  const [currentStreak, setCurrentStreak] = useState();
  const [showStreak, setShowStreak] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [showDeadlineForm, setShowDeadlineForm] = useState(false);
  const [newDate, setNewDate] = useState('');

   const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

   useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    // Example: Fetch from localStorage
    const streak = localStorage.getItem('currentStreak');
    if (streak) {
      setCurrentStreak(Number(streak));
    }
  }, []);
  useEffect(() => {
  // Check streak and last update date on load
  const streak = localStorage.getItem('currentStreak');
  const lastUpdate = localStorage.getItem('lastStreakUpdate');
  const today = new Date().toLocaleDateString('en-GB');

  if (lastUpdate !== today) {
    setCurrentStreak(0);
    localStorage.setItem('currentStreak', 0);
    localStorage.setItem('lastStreakUpdate', today);
  } else if (streak) {
    setCurrentStreak(Number(streak));
  }
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
    const heights = [100, 80, 50]; // Adjust as needed
    document.querySelectorAll('.rectangle-21 .vertical-bar').forEach((bar, i) => {
    setTimeout(() => {
      bar.style.height = `${heights[i]}px`;
    }, 200);
    });
     // Animate vertical bars in rectangle-10
    const heights10 = [70, 40,0]; // px, adjust as needed
    document.querySelectorAll('.rectangle-10 .vertical-bar').forEach((bar, i) => {
    setTimeout(() => {
      bar.style.height = `${heights10[i]}px`;
    }, 200);
    });
    // Animate vertical bars in rectangle-11
    const heights11 = [90, 60, 30]; // adjust as needed
    document.querySelectorAll('.rectangle-11 .vertical-bar').forEach((bar, i) => {
    setTimeout(() => {
      bar.style.height = `${heights11[i]}px`;
    }, 200);
    });
    return ()=> unsubscribe();
  },[]) ;

  const handleAddDeadline = (e) => {
    e.preventDefault();
    if (newSubject && newDate) {
      setUpcomingDeadlines([
        ...upcomingDeadlines,
        { subject: newSubject, date: newDate.split('-').reverse().join('/') }
      ]);
      setNewSubject('');
      setNewDate('');
    }
  };



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
          <Link to="/dashboard" style={{ position: 'relative', zIndex: 10 }}>
                                                   <img src={Logo} alt="Logo" style={{
                                                      width: '200px',     /* Adjust as needed */
                                                       marginLeft: '1.5rem',
                                                       }} />
                                                 </Link>
          <div className="rectangle" ></div>
          <img className="img" src="/img/image1.png" />
          <div className="text-wrapper"><Link to='/resources' style={{ color: 'black', display: 'block' }}>Resources</Link></div>
          <div className="div" style={{ backgroundColor: 'lightblue' }}></div>
          <p className="welcome-back-buddy">
            <span className="span" style={{ color: '#00008B' }} >Welcome back, buddy</span> <span className="text-wrapper-2">:)</span>
          </p>
          <div className="bottom-boxes">
          
         <div className="rectangle-2">
          <button
            style={{
              width:showDeadlineForm ?'30%' : '100%',
              height: showDeadlineForm ? '30%' : '100%',
              marginTop: 0,
              
              border: 'none',
              background: 'linear-gradient(90deg,rgb(152, 44, 98) 0%,rgb(71, 178, 245) 100%)',
              color: '  rgb(250, 241, 241) 0% ',
              padding: showDeadlineForm ? '7px 0px' : '12px 32px',
              borderRadius: showDeadlineForm ?  '10px' : '50px',
              fontSize: showDeadlineForm ? '0.95rem' : '1.1rem',
              fontSize: '1.1rem',
              letterSpacing: '1px',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              transition: 'background 0.2s, box-shadow 0.2s',
              boxShadow: '0 2px 8px rgba(79,140,255,0.15)'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg,rgb(103, 161, 125) 0%,rgb(104, 142, 161) 100%)'}
            onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg,rgb(114, 134, 172) 0%,rgb(75, 139, 94) 100%)'}
            onClick={() => setShowDeadlineForm(v => !v)}
          >
            {showDeadlineForm ? 'Close' : 'Add Deadline'}
          </button>            {showDeadlineForm && (
              <form onSubmit={handleAddDeadline} style={{ margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Subject"
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  required
                  style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                  type="date"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  required
                  style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '4px 10px', borderRadius: '4px', background: '#b6ccfa', border: 'none', cursor: 'pointer' }}>
                  Save
                </button>
              </form>
            )}

            
          </div>
          <div className="rectangle-3">
            {/* List of deadlines with remove button */}
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '12px' }}>
              {upcomingDeadlines.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>
                    <b>{item.subject}</b> <span style={{ color: 'rgb(133, 227, 204)', marginLeft: 8 }}>{item.date}</span>
                  </span>
                  <button
                    onClick={() => {
                      setUpcomingDeadlines(upcomingDeadlines.filter((_, i) => i !== idx));
                    }}
                    style={{ marginLeft: 8, padding: '2px 8px', borderRadius: '6px', border: '1px solid rgb(1, 4, 10)', background: '#ffe0e0', color: 'rgb(105, 156, 163)', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
              
          </div>
          <div className="rectangle-4"style={{ padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            
            <Calendar
            value={new Date()}
            tileClassName={({ date, view }) => {
              // Highlight deadline dates
              const dates = upcomingDeadlines.map(d => new Date(d.date.split('/').reverse().join('-')));
              return dates.some(d => d.toDateString() === date.toDateString()) ? 'highlight' : null;
            }}
            style={{ width: '100px' }}
          />
          <span style={{ fontSize: '0.8rem', marginTop: '6px' }}>Deadlines highlighted</span>
        </div>
           </div>
          <div className="rectangle-5">
              <div className="inside-rectangle-5" style={{
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
                  
                   {/* Your dashboard layout */}
                  <ChatIcon />
                  </div>
                  
          
          <div className="rectangle-8"></div>
          <div className="rectangle-9"></div>
          <p className="p">time spend on learning :</p>
          <div className="text-wrapper-6">fri</div>
          <div className="text-wrapper-7">sat</div>
          <div className="rectangle-10">
            <div className="vertical-bar bar1"></div>
            <div className="vertical-bar bar2"></div>
            <div className="vertical-bar bar3"></div>
          </div>
          <div className="rectangle-11">
            <div className="vertical-bar bar1"></div>
            <div className="vertical-bar bar2"></div>
            <div className="vertical-bar bar3"></div>
          </div>
          {/* <div className="rectangle-12"></div> */}
          <div className="rectangle-13"></div>
          <div className="rectangle-14"></div>
          <div className="rectangle-15"></div>
          <img className="polygon" src="img/polygon-1.svg" />
          <div className="rectangle-16"></div>
          <div className="rectangle-17"></div>
          <div className="rectangle-18"></div>
          <div className="rectangle-19"></div>
          <div className="rectangle-20" style={{
         width: "200px", height:'140px', marginTop:'-70px', marginLeft:'-50px'
          }}> 

            <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_iv4dsx3q.json" background="transparent" speed="1" loop autoplay style={{ width: "100%", height: "100%" }}></lottie-player>
                      <div style={{ position: 'absolute', top: 30, right: 40, zIndex: 100 }}>
        <div
          style={{
            width: 40,
            height: 40,
            background: '#fffbe6',
            border: '2px solid #e52929',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            marginTop: '-135px',
            marginLeft: '-60px',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            position: 'relative'
          }}
          onClick={() => setShowStreak(!showStreak)}
          title="Show streak"
        >
          <span role="img" aria-label="fire" style={{ fontSize: '1.5rem' }}>🔥</span>
          {showStreak && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#fff',
                border: '1.5px solid #e52929',
                borderRadius: 8,
                padding: '8px 16px',
                color: '#e52929',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                whiteSpace: 'nowrap',
                zIndex: 1000
              }}
            >
              {currentStreak} task streak!
            </div>
          )}
        </div>
      </div>
            </div>
          {/* <div className="ellipse"></div> */}
          <div className="rectangle-21">
            
            <div className="vertical-bar bar1"></div>
            <div className="vertical-bar bar2"></div>
            <div className="vertical-bar bar3"></div>
          </div>
          <div className="rectangle-22"></div>
          {/* <div className="rectangle-23"></div> */}
          {/* <div className="rectangle-23"></div> */}
          {/* <div className="rectangle-24"></div> */}
          {/* <div className="rectangle-25"></div> */}
          {/* <div className="rectangle-26"></div> */}
          {/* <div className="rectangle-27"></div> */}
          {/* <div className="rectangle-28"></div> */}
          {/* <div className="rectangle-29"></div> */}
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

          <div className="text-wrapper-16" style={{ 
            textAlign: 'right', padding: '10px', fontWeight: 'bold', fontSize: '1.1rem',
              background: 'rgb(235, 136, 136)', marginTop: '-20px',
              border: '2px solid #222', marginLeft:'-40px',
              borderRadius: '10px',
              color: '#111', // very dark text
              
              width: 'fit-content',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                      
            }}>
              {dateTime.toLocaleDateString('en-GB')} , {dateTime.toLocaleTimeString()}
              </div>
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
          <div className="rectangle-39"><div className="rectangle39_fillbar"><span className="fillbar-text">50%</span></div></div>
          <div className="rectangle-40"><div className="rectangle40_fillbar"><span className="fillbar-text">70%</span></div></div>
          <div className="rectangle-41"><div className="rectangle41_fillbar"><span className="fillbar-text">30%</span></div></div>
          <div className="rectangle-42"><div className="rectangle42_fillbar"><span className="fillbar-text">95%</span></div></div>
          <div className="rectangle-43"><div className="rectangle43_fillbar"><span className="fillbar-text">74%</span></div></div>
          {/*<div className="rectangle-44"></div>  */}
          {/* <div className="rectangle-45"></div> */}
          {/* <div className="rectangle-46"></div> */}
          {/* <div className="rectangle-47"></div> */}
          {/* <div className="rectangle-48"></div> */}
          <div className="ellipse-2"><Pfpchanger/></div>
          <p className="text-wrapper-29"><h2>you learned ----hrs and -----questions this week</h2></p>
          
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
