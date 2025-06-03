import React ,{ useState} from 'react'
import {getDatabase , ref , set} from 'firebase/database'
//import{getStorage , ref as storageRef, uploadBytes,getDownloadURL} from 'firebase/storage'
import {app} from '../Firebase'
import { useNavigate} from 'react-router-dom'

const AddStudent=() =>  {
    const [name , setName] = useState('')
    const [Admno , setAdmno] = useState(null)
    const[phone , setPhone] = useState(null)
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
        set(ref(db , 'student/'+ Admno ),{
            studentname : name,
            phonenumber : phone,
            //imageURL : imageURL
        })
        .then( res =>{
            navigate('/dashboard/studentlist')

        }) 
        .catch(err=>{
            console.log(err)
        })
      
    }
    return (
        <div>
           <form onSubmit={submitHandler}>
            <input onChange = {(e)=> setAdmno(e.target.value)}  type ='text' placeholder='Adm no'/>
            <input onChange = {(e)=> setName(e.target.value)}  type ='text' placeholder='enter student name '/>
            <input onChange ={(e) => setPhone(e.target.value)} type ='number' placeholder='enter phone number'/>
            {/* <input onChange = {handleFileChange} type = 'file'/> */}
            <button type ='submit'>submit</button>
           </form>
        </div>  
    )
}

export default AddStudent
