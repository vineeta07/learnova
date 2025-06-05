import React , {useEffect , useState} from 'react'
import { getDatabase, onValue , ref , remove} from 'firebase/database'
import {getStorage , ref as storageref , deleteObject} from 'firebase/storage'
import {app} from '../Firebase'
import { useNavigate} from 'react-router-dom'

const Tasklist = () => {
  const [studentdata , setstudentdata] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    const db = getDatabase(app)
    const studentRef = ref (db , 'student/')
    
    onValue (studentRef , (snapshot)=>{
      const data = snapshot.val()
      console.log(data)
      setstudentdata(data)
    })

  } , [])

  const deletedata = (key) =>{
    const db = getDatabase(app)

    //const storage = getStorage(app)

    const studentRef = ref(db , 'student/' + key)

    //const myRef = storageRef(storage ,'images/' + key )
    
    /* deleteObject(myRef)
    .then((ref) =>{
      remove(studentRef)
    })
    .catch((err)=>{
      console.log(err)
    }) */
  }
  return (
    <div>
        <h1>Student List</h1>
        {studentdata && (
          <div> 
            { Object.entries(studentdata).map ( ([key , value]) => {
              return(
              <div key ={key}>
              {/*   <img style = {{width:'20%'}}src ={value.imageURL} */}
                <p>{value.studentname} {value.phonenumber}</p>
                <button onClick = {()=>{deletedata(key)}}> delete </button>
                <button onClick = {()=>{navigate('/updatetask',{state :[key , value]})}}>Update</button>
              </div>
              )

            })}
          </div>
        )}
    </div>
  )
}

export default Tasklist
