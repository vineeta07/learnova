import React , {useState} from 'react'
import { getFirestore , doc , updateDoc} from 'firebase/firestore'
import {app} from '../Firebase'
import {useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'


const UpdateFaculty = () => {
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location.state)
    const[name , setName] = useState(location.state.facultyname)
    const[phone, setPhone] = useState(location.state.phonenumber)

    const submitHandler = async(event) => {
        event.preventDefault()
        //console.log(name, phone)
        const db = getFirestore(app)
        const docRef = doc( db , 'faculty', location.state.id)
        try{
            await updateDoc(docRef, {facultyname:name, phonenumber:phone})
            navigate ('/dashboard/facultylist')

        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
      <h1>Update Faculty</h1>
      <form onSubmit = {submitHandler}>
        <input value={name} onChange = {(e)=>setName(e.target.value)} placeholder = 'full name'/>
        <input value ={phone} onChange = {(e)=>setPhone(e.target.value)} placeholder = 'phone number'/>
        <button type='submit'>update</button>
      </form>
    </div>
  )
} 

export default UpdateFaculty
