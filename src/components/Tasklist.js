import React , {useEffect , useState} from 'react'
import { getDatabase, onValue , ref , remove} from 'firebase/database'
import {getStorage , ref as storageref , deleteObject} from 'firebase/storage'
import {app} from '../Firebase'
import { useNavigate} from 'react-router-dom'
import './Tasklist.css';

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
    .then((ref) =>{ */
      remove(studentRef)
    //})
    .catch((err)=>{
      console.log(err)
    }) 
  }
return (
  <div className="tasklist-container">
    {studentdata && (
      <div>
        {Object.entries(studentdata).map(([key, value]) => (
          <div key={key} className="tasklist-item">
            <span>{value.subject} {value.Task}</span>
              
            
            <span className="tasklist-actions">
              <button onClick={() => deletedata(key)}>Delete</button>
              <button onClick={() => navigate('/updatetask', { state: [key, value] })}>Update</button>
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
)
}

export default Tasklist
