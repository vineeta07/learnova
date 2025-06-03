import React , {useState} from 'react'
import {collection , addDoc , getFirestore} from 'firebase/firestore'
import {app} from '../Firebase'
import {useNavigate} from 'react-router-dom'

const AddFaculty = () => {
    const[name ,setName] = useState('')
    const[phone, setPhone] = useState(null)
    const navigate = useNavigate()

    const submitHandler = async(event) => {
        event.preventDefault()
        console.log(name, phone)
        
        try{
        const db = getFirestore(app)
        const docRef = await addDoc(collection(db,'faculty'),{
            facultyname :name ,
            phonenumber :phone
        })
          console.log(docRef , docRef.id )
          navigate('/dashboard/facultylist')
      }catch (err){
          console.log(err)
        }
    }

  return (
    <div>
      <h1>Add Faculty</h1>
      <form onSubmit = {submitHandler}>
        <input onChange = {(e)=>setName(e.target.value)} placeholder = 'full name'/>
        <input onChange = {(e)=>setPhone(e.target.value)} placeholder = 'phone number'/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
} 

export default AddFaculty
