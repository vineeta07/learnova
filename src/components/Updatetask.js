import React ,{ useState} from 'react'
import {getDatabase , ref , update} from 'firebase/database'
//import{getStorage , ref as storageRef, uploadBytes,getDownloadURL} from 'firebase/storage'
import {app} from '../Firebase'
import { useNavigate , useLocation } from 'react-router-dom'
import './Updatetask.css';

const Updatetask=() =>  {
     const navigate = useNavigate()
    const location = useLocation()
    const [sub , setSub] = useState(location.state[1].subject)
    const [taskno , setTaskno] = useState(location.state[0] )
    const[task , setTask] = useState(location.state[1].Task)

    //  const[selectedfile , setselectedfile] = useState(null)
    /*  const handleFileChange = (event) =>{
        const file = event.target.files[0]
        setselectedfile(file)

    } */
   
    console.log(location)

    const submitHandler = (event) => {
        event.preventDefault();
      /*  if(selectedfile){
         const db = getDatabase(app)
        const storage = getStorage(app)

        const myRef = storageRef(storage, `images/${location.state[0]}`)
        await uploadBytes(myRef, selectedfile)

        const imageURL = await getDownloadURL(myRef)

        const studentRef = ref( db , 'student/' + location.state[0])
        update(studentRef ,{studentname : name , phonenumber : phone}) // add ,imageURL : imageURL
        .then( res =>{
            navigate('/studentlist')
        })
        .catch(err=>{
            console.log(err)
        })
       } */
       //else{  
        const db = getDatabase(app)

        const studentRef = ref( db , 'student/' + location.state[0])
        update(studentRef ,{subject : sub , Task : task}) 
        .then( res =>{
            navigate('/learningplan')
        })
        .catch(err=>{
            console.log(err)
        })
         //}
       
    }
    return (
        <div className='updatetask_container'>
           <form onSubmit={submitHandler} className='updatetask_form'>
            <input disabled value ={taskno} onChange = {(e)=> setTaskno(e.target.value)}  type ='text' placeholder='Task no' className='updatetask_box'/>
            <input value = {sub} onChange = {(e)=> setSub(e.target.value)}  type ='text' placeholder='enter subject ' className='updatetask_box'/>
            <input value = {task} onChange ={(e) => setTask(e.target.value)} type ='text' placeholder='enter your task' className='updatetask_box'/>
            {/* <input onChange = {handleFileChange} type = 'file'/> */}
            <button type ='submit' className='Submit_button'>update</button>
           </form>
        </div>
    )
}

export default Updatetask
