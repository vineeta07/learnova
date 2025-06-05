import React from 'react'
import {Link, Outlet} from 'react-router-dom'


const subject = () => {
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
                    <h4>SUBJECT</h4></div>
                <div className="rectangle-33"></div>
                <div className="text-wrapper-16">date,day</div>
                <div className="ellipse-2"></div>
                
                <img className="profile" src="img/profile.svg" />
              </div>
              
              </div>
           
          
            
            
          </div>
          </div>
    </div>
  )
}

export default subject
