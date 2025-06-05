import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';

import AddFaculty from './components/AddFaculty';
import FacultyList from './components/FacultyList';
import UpdateFaculty from './components/UpdateFaculty';
import Signup from './components/Signup';
import Login from './components/Login';
import Resources from './components/Resources'; 
import Subject from './components/subject'; // Import the subject component 
import Learningplan from './components/Learningplan'; 
import Addtask from './components/Addtask';
import Tasklist from './components/Tasklist';
import Updatetask from './components/Updatetask';


const myRouter = createBrowserRouter([
  {path: 'signup' , element: <Signup/>},
  {path: 'login' , element: <Login/>},
  {
    path: 'dashboard',element: <Dashboard />, children: [

      
      {path: 'addfaculty', element: <AddFaculty/>}, 
      {path: 'facultylist', element: <FacultyList/>},
      {path: 'updatefaculty', element: <UpdateFaculty/>},
      { path: '*', element: <div>404 Not Found</div> }
  ]},
  { path: 'resources', element: <Resources/>},
  { path: 'subject', element: <Subject/> },
   { path: 'learningplan', element: <Learningplan/> , children:[
    { path: '', element: <Tasklist /> }, 
    { path: 'addtask', element: <Addtask /> },
    {path:'tasklist', element:<Tasklist/>},
    {path: 'updatetask', element: <Updatetask /> } 
   ] }

])
    
function App() {
  return (
    
      <RouterProvider router={myRouter} />
      

  );

}

export default App;
