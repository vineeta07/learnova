import React from 'react' 
import {Link, Outlet} from 'react-router-dom'

const Dashboard = () => {
  return (
    <div style ={{display:'flex', flexDirection :'row'}}>
    <div style ={{width :'20%', backgroundColor:'royalblue', height:'100vh'}}>
       
      <Link to ='/dashboard/addstudent' style ={{color:'white', display: 'block'}}>add student</Link>
      <Link to ='/dashboard/studentlist' style ={{color:'white', display: 'block'}}>student list</Link>
      <Link to ='/dashboard/addfaculty' style ={{color:'white', display: 'block'}}>add faculty</Link>
      <Link to ='/dashboard/facultylist' style ={{color:'white', display: 'block'}}>faculty list</Link>
    </div>
    <div style ={{width :'80%', backgroundColor:'lightgray', height:'100vh'}}>
        <Outlet/>
    </div>
    </div>
  )
}

export default Dashboard
