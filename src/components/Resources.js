import React ,{useEffect, useState}from 'react'
import {Link, Outlet} from 'react-router-dom'
import './Dashboard.css'
import {app} from '../Firebase'
import {getAuth,onAuthStateChanged} from 'firebase/auth'


import Logo from '../images/Logo.png';
import ChatIcon from './ChatIcon';
import PfpChanger from './PfpChanger'



const resourcesSectionStyle = {
  width: '60%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center', // align to left
  justifyContent: 'flex-start',
  marginTop: '0',
  marginLeft: '20rem',
};

const resourcesListStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginTop: '-50px',
  flexWrap: 'wrap',
  gap: '5rem',
  
  width: '80%',
  justifyContent: 'flex-start'
};

const resourceCardStyle = {
  border: '1px solid green',
  borderRadius: '8px',
  padding: '1rem',
  width: '300px',
  boxShadow: '0 2px 8px rgb(97, 113, 104)',
  background: 'rgb(77, 187, 170)' //
};
const resourceList = [
    {
    id: 5,
    title: ' Programming fundamentals',
    description: 'Watch one shot lecture on C',
    link: 'https://youtu.be/ZSPZob_1TOk?si=u7mOydMt3u6kwN3L',
    type: 'video'
  },
  {
    id: 1,
    title: 'Python Basics PDF',
    description: 'Download the Python basics notes.',
    link: 'https://bugs.python.org/file47781/Tutorial_EDIT.pdf',
    type: 'pdf'
  },
  {
    id: 2,
    title: 'Complex Analysis Video',
    description: 'Watch the lecture on Complex Analysis.',
    link: 'https://youtube.com/playlist?list=PLU6SqdYcYsfI3sh-ho_iiTkCGsTbVh_Sw&si=gh1UTMa_72XKjk98',
    type: 'video'
  },
  {
    id: 3,
    title: 'MATLAB Programming Guide',
    description: 'Read the MATLAB programming guide.',
    link: 'https://www.mccormick.northwestern.edu/documents/students/undergraduate/introduction-to-matlab.pdf',
    type: 'pdf'
  },
  {
    id: 4,
    title: 'MATHS AM 101',
    description: 'pratice math pyqs.',
    link: 'https://www.dtuonline.com/papers/btech-1-sem-mathematics-1-am101-nov-2024.pdf',
    type: 'pdf'
  },
  
];
const Resources = () => {
   
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
                      <img className="img" src="img/image3.png" />
                      <div className="text-wrapper"><Link to='/resources' style={{ color: 'black', display: 'block' }}>Resources</Link></div>
                    
                      <div style={resourcesSectionStyle}>
                    <div style={resourcesListStyle}>
                        {resourceList.map(resource => (
                        <div key={resource.id} style={resourceCardStyle}>
                            <h3>{resource.title}</h3>
                            <p>{resource.description}</p>
                            <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'rgb(102, 7, 169)',
                                textDecoration: 'underline'
                            }}
                            >
                            {resource.type === 'pdf' ? 'Download PDF' : 'View Resource'}
                            </a>
                        </div>
                        ))}
                    </div>
                    </div>
                      
                      <div className="rectangle-5">
                        <div className="inside-rectangle-5"style={{
                marginTop: '750px',
              }}>
                          <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_EzPrWM.json" background="transparent" speed="1" loop autoplay
                          style={{ width: "100%", height: "100%" }}></lottie-player>
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
                      </div>
   
                      <div className="rectangle-7"><ChatIcon /></div>

                      <div className="text-wrapper-15">
                        <h4 >RESOURCES</h4>
                        </div>
                     

                      <div className="text-wrapper-16" style={{ 
                          textAlign: 'right', padding: '10px', fontWeight: 'bold', fontSize: '1.1rem',
                            background: 'rgb(217, 243, 172)', marginTop: '-10px',
                            border: '2px solid #222', marginLeft:'-40px',
                            borderRadius: '10px',
                            color: '#111', // very dark text
                            
                            width: 'fit-content',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                    
                          }}>
                              {dateTime.toLocaleDateString('en-GB')} , {dateTime.toLocaleTimeString()}</div>
                      <div className="ellipse-2">
                        <PfpChanger/>
                      </div>

                    </div>
                    
                    </div>
                 
                
                  
                  
                </div>
                
                </div>
    
  )
}

export default Resources

