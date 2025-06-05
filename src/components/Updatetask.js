import React ,{ useState} from 'react'
import {getDatabase , ref , update} from 'firebase/database'
//import{getStorage , ref as storageRef, uploadBytes,getDownloadURL} from 'firebase/storage'
import {app} from '../Firebase'
import { useNavigate , useLocation } from 'react-router-dom'

const Updatetask=() =>  {
     const navigate = useNavigate()
    const location = useLocation()
    const [name , setName] = useState(location.state[1].studentname)
    const [Admno , setAdmno] = useState(location.state[0] )
    const[phone , setPhone] = useState(location.state[1].phonenumber)

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
        update(studentRef ,{studentname : name , phonenumber : phone}) 
        .then( res =>{
            navigate('/learning plan/tasklist')
        })
        .catch(err=>{
            console.log(err)
        })
         //}
       
    }
    return (
        <div>
           <form onSubmit={submitHandler}>
            <input disabled value ={Admno} onChange = {(e)=> setAdmno(e.target.value)}  type ='text' placeholder='Adm no'/>
            <input value = {name} onChange = {(e)=> setName(e.target.value)}  type ='text' placeholder='enter student name '/>
            <input value = {phone} onChange ={(e) => setPhone(e.target.value)} type ='number' placeholder='enter phone number'/>
            {/* <input onChange = {handleFileChange} type = 'file'/> */}
            <button type ='submit'>update</button>
           </form>
        </div>
    )
}

export default Updatetask
