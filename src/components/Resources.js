import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import './Dashboard.css'

const resourcesSectionStyle = {
  width: '60%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center', // align to left
  justifyContent: 'flex-start',
  marginTop: 0,
  marginLeft: '20rem',
};

const resourcesListStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginTop: '12rem',
  flexWrap: 'wrap',
  gap: '2rem',
  width: '80%',
  justifyContent: 'flex-start'
};

const resourceCardStyle = {
  border: '1px solid green',
  borderRadius: '8px',
  padding: '1rem',
  width: '300px',
  background: '#26c4ac' //
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
  return (
    <div>
      <div className="main">
      
                    
                <div className="desktop" >
                     
                  <div className="overlap-group-wrapper">
                    <div className="overlap-group">
           
                      <img className="img" src="img/rectangle-3.png" />
                      <div className="text-wrapper"><Link to='/resources' style={{ color: 'black', display: 'block' }}>Resources</Link></div>
                    
                     
                      <div className="rectangle-2"></div>
                      <div className="rectangle-3"></div>
                      <div className="rectangle-4"></div>
                      <div className="rectangle-5"></div>
                       
                      <div className="text-wrapper-3"> 
                        <Link to ='/dashboard' style ={{color:'black', display: 'block'}}>Dashboard</Link> </div>
                      <div className="text-wrapper-4">  <Link to='/subject' style={{ color: 'black', display: 'block' }}>Subject</Link></div>
                      <div className="rectangle-6"></div>
                      <div className="text-wrapper-5"> <Link to='/learningplan' style={{ color: 'black', display: 'block' }}>Learning plan</Link></div>
                      <div className="rectangle-7"></div>
                      <div className="text-wrapper-15">
                        <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>RESOURCES</h4>
                        </div>
                      <div className="rectangle-33"></div>
                      <div className="text-wrapper-16">date,day</div>
                      <div className="ellipse-2"></div>



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
                                color: 'darkblue',
                                textDecoration: 'underline'
                            }}
                            >
                            {resource.type === 'pdf' ? 'Download PDF' : 'View Resource'}
                            </a>
                        </div>
                        ))}
                    </div>
                    </div>
                      
                      <img className="profile" src="img/profile.svg" />
                    </div>
                    
                    </div>
                 
                
                  
                  
                </div>
                </div>
    </div>
  )
}

export default Resources

