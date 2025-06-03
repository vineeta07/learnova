
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent'; // Import the UpdateStudent component
import AddFaculty from './components/AddFaculty';
import FacultyList from './components/FacultyList';
import UpdateFaculty from './components/UpdateFaculty';
import Signup from './components/Signup';
import Login from './components/Login';


const myRouter = createBrowserRouter([
  {path: 'signup' , element: <Signup/>},
  {path: 'login' , element: <Login/>},
  {
    path: 'dashboard',element: <Dashboard />, children: [
      { path: '', element: <StudentList /> }, // Changed from Component to element
      { path: 'addstudent', element: <AddStudent /> }, // Changed from Component to element
      { path: 'studentlist', element: <StudentList /> }, // Changed from Component to element
      { path: 'updatestudent' , element : <UpdateStudent/>},
      {path: 'addfaculty', element: <AddFaculty/>}, 
      {path: 'facultylist', element: <FacultyList/>},
      {path: 'updatefaculty', element: <UpdateFaculty/>}
  ]}
])
    
function App() {
  return (
    
      <RouterProvider router={myRouter} />

  );
}

export default App;
