import React ,{ useState ,useEffect } from 'react'
import {Link, Outlet} from 'react-router-dom'
import {app} from '../Firebase'
import {getAuth,  onAuthStateChanged} from 'firebase/auth'
import Logo from '../images/Logo.png'; // Adjust the path to your logo image
import ChatIcon from './ChatIcon';
import Pfpchanger from './PfpChanger';

const resourcesSectionStyle = {
  width: '80%',
  display: 'flex',
  flexDirection: 'row',
  paddingTop: 0 ,
  justifyContent: 'flex-start',
  marginTop: 0,
  marginLeft: '20rem',
  
};

const subjectsContainerStyle = {
   display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
   marginTop: '-50px',
    paddingTop: 0 ,
  flexWrap: 'wrap',
  gap: '2rem',
  width: '100%',
  justifyContent: 'flex-start'
};


const subjectCardStyle = {
  border: '1px solid rgb(16, 17, 1)17, 2)',
  borderRadius: '10px',
  padding: '1.5rem',
  minWidth: '220px',
  background: ' rgb(166, 109, 186)',
  boxShadow: '0 2px 8px rgb(35, 14, 42)',
  marginBottom: '1rem'
};


const subjects = [
  {
    id: 1,
    name: 'Mathematics',
    code: 'AM101',
    syllabus: [
      'Unit 1: Calculus',
      'Unit 2: Linear Algebra',
      'Unit 3: Differential Equations'
    ],
     link: 'https://youtu.be/ZSPZob_1TOk?si=u7mOydMt3u6kwN3L',

  },
  {
    id: 2,
    name: 'Programming Fundamentals',
    code: 'CS101',
    syllabus: [
      'Unit 1: Basics of C',
      'Unit 2: Control Structures',
      'Unit 3: Functions and Arrays'
    ]
  },
  {
    id: 3,
    name: 'Complex Analysis',
    code: 'MA201',
    syllabus: [
      'Unit 1: Complex Numbers',
      'Unit 2: Analytic Functions',
      'Unit 3: Contour Integration'
    ]
  },
  {
    id: 4,
    name: 'Discrete Mathematics',
    code: 'CS102',
    syllabus: [
      'Unit 1: Set Theory',
      'Unit 2: Graph Theory',
      'Unit 3: Combinatorics'
    ]
  },
   {
    id: 5,
     name: 'Physics',
    code: 'AP101',
    syllabus: [
      'Unit 1: Mechanics',
      'Unit 2: Thermodynamics',
      'Unit 3: Electromagnetism'
    ]
  },
   {
    id: 6,
    name: 'Data Structures',
    code: 'CS201',
    syllabus: [
      'Unit 1: Arrays and Linked Lists',
      'Unit 2: Stacks and Queues',
      'Unit 3: Trees and Graphs'
    ]
  },
   {
    id: 7,
    name: 'Digital Electronics',
    code: 'EE101',
    syllabus: [
      'Unit 1: Number Systems',
      'Unit 2: Logic Gates',
      'Unit 3: Flip-Flops and Counters'
    ]
  },
    {
    id: 8,
    name: 'Environmental Science',
    code: 'EVS101',
    syllabus: [
      'Unit 1: Ecosystems',
      'Unit 2: Biodiversity',
      'Unit 3: Environmental Pollution'
    ]
  },
    {
    id: 9,
    name: 'Engineering Drawing',
    code: 'ED101',
    syllabus: [
      'Unit 1: Orthographic Projections',
      'Unit 2: Isometric Views',
      'Unit 3: Sectional Views'
    ]
  },
    {
      id: 10,
    name: 'Chemistry',
    code: 'CHEM101',
    syllabus: [
      'Unit 1: Atomic Structure',
      'Unit 2: Chemical Bonding',
      'Unit 3: Organic Chemistry'
    ]
  }
];


const Subject = () => {
  const [openSyllabus, setOpenSyllabus] = useState(null);

  const handleToggle = (id) => {
    setOpenSyllabus(openSyllabus === id ? null : id);
  };
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
                <img className="img" src="img/image2.png" />
                <div className="text-wrapper"><Link to='/resources' style={{ color: 'black', display: 'block' }}>Resources</Link></div>
               <div style={resourcesSectionStyle}>
               <div style={subjectsContainerStyle}>
                  {subjects.map(sub => (
                    <div key={sub.id} style={subjectCardStyle}>
                      <strong>{sub.name}</strong> <br />
                      <span style={{ color: ' #555' }}>{sub.code}</span>
                      <br />
                      <button
                        style={{
                          marginTop: '1rem',
                          background: 'rgb(188, 152, 177)',
                          color: ' #fff ',
                          border: 'black',
                          borderRadius: '5px',
                          padding: '6px 14px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleToggle(sub.id)}
                      >
                        {openSyllabus === sub.id ? 'Hide Syllabus' : 'View Syllabus'}
                      </button>
                      {openSyllabus === sub.id && (
                        <ul style={{
                          marginTop: '1rem',
                          paddingLeft: '1.2rem'
                        }}>
                          {sub.syllabus.map((topic, idx) => (
                            <li key={idx}>{topic}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                   
              </div>
                
               
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
               
                </div>
                </div>
                      
                <div className="rectangle-7">
                   <ChatIcon />
                </div>
                
                <div className="text-wrapper-15">
                  
                 
              

               
                  <h4>SUBJECTS</h4></div>
                   
                
                      <div className="text-wrapper-16" style={{ 
                          textAlign: 'right', padding: '10px', fontWeight: 'bold', fontSize: '1.1rem',
                            background: 'rgb(245, 176, 230)', marginTop: '-10px',
                            border: '2px solid #222', marginLeft:'-40px',
                            borderRadius: '10px',
                            color: '#111', // very dark text
                            
                            width: 'fit-content',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                    
                          }}>
                           {dateTime.toLocaleDateString('en-GB')} , {dateTime.toLocaleTimeString()} </div>
                <div className="ellipse-2"><Pfpchanger/></div>

              </div>
              
           </div>
           
                  </div>
            
              </div>    
              
          
          
          
          
  
  )
}

export default Subject
 