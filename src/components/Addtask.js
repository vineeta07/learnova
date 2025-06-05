import React ,{ useState} from 'react'
import {getDatabase , ref , set} from 'firebase/database'
//import{getStorage , ref as storageRef, uploadBytes,getDownloadURL} from 'firebase/storage'
import {app} from '../Firebase'
import { useNavigate} from 'react-router-dom'
import './addtask.css';
import { Link } from 'react-router-dom';

const Addtask=() =>  {
    const [task , setTask] = useState('')
    const [Taskno , setTaskno] = useState(null)
    const[sub , setSub] = useState(null)
    //const[selectedfile , setselectedfile] = useState(null)
    const navigate = useNavigate()
    /* const handleFileChange = (event) =>{
        const file = event.target.files[0]
        setselectedfile(file)

    } */

    const submitHandler = async(event) => {
        event.preventDefault();
        const db = getDatabase(app)
        /* const storage = getStorage(app)

        const myRef = storageRef(storage, `images/${Admno}`)
        await uploadBytes(myRef, selectedfile)

        const imageURL = await getDownloadURL(myRef)
 */
        set(ref(db , 'student/'+ Taskno ),{
            Task : task,
            subject : sub,
            //imageURL : imageURL
        })
        .then( res =>{
            navigate('/learningplan')

        }) 
        .catch(err=>{
            console.log(err)
        })
      
    }
    return (
        <div className='addtask_container'>
           <form onSubmit={submitHandler}className='addtask_form'>
             <input onChange ={(e) => setTaskno(e.target.value)} type ='number' placeholder='task no' className='addtask_box'/>
            <input onChange = {(e)=> setSub(e.target.value)}  type ='text' placeholder='enter subject'className='addtask_box'  />
            <input onChange = {(e)=> setTask(e.target.value)}  type ='text' placeholder='enter your task  ' className='addtask_box' />
           
            {/* <input onChange = {handleFileChange} type = 'file'/> */}
            <button type ='submit'className='Submit_button'>submit</button>
           </form>
            
            
                    
        
    
        </div>
    
        
    )
}

export default Addtask
