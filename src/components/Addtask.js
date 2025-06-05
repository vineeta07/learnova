import React ,{ useState} from 'react'
import {getDatabase , ref , set} from 'firebase/database'
//import{getStorage , ref as storageRef, uploadBytes,getDownloadURL} from 'firebase/storage'
import {app} from '../Firebase'
import { useNavigate} from 'react-router-dom'
import './addtask.css'; // Assuming you have a CSS file for styling
import { Link} from 'react-router-dom';

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
            setTask : task,
            setSub : sub,
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
        <div>
           <form onSubmit={submitHandler}>
             <input onChange ={(e) => setTaskno(e.target.value)} type ='number' placeholder='task no'/>
            <input onChange = {(e)=> setSub(e.target.value)}  type ='text' placeholder='enter subject'/>
            <input onChange = {(e)=> setTask(e.target.value)}  type ='text' placeholder='enter your task  '/>
           
            {/* <input onChange = {handleFileChange} type = 'file'/> */}
            <button type ='submit'>submit</button>
           </form>
            
            
                    
                      <div>
                            <div className="main">
                            
                                          
                                      <div className="desktop" >
                                           
                                        <div className="overlap-group-wrapper">
                                          <div className="overlap-group">
                                 
                                            <img className="img" src="img/rectangle-3.png" />
                                            <div className="text-wrapper"><Link to='/resources' style={{ color: 'black', display: 'block' }}>Resources</Link></div>
                                          
                                        
                                            
                                            <div className="rectangle-5"></div>
                                             
                                            <div className="text-wrapper-3"> 
                                              <Link to ='/dashboard' style ={{color:'black', display: 'block'}}>Dashboard</Link> </div>
                                            <div className="text-wrapper-4">  <Link to='/subject' style={{ color: 'black', display: 'block' }}>Subject</Link></div>
                                            <div className="rectangle-6"></div>
                                            <div className="text-wrapper-5"> <Link to='/learningplan' style={{ color: 'black', display: 'block' }}>Learning plan</Link>
                            
                                            </div>
                                            </div>
                                            
                                            
                                            <div className="rectangle-7"></div>
                                            <div className="text-wrapper-15">
                                              <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>RESOURCES</h4>
                                              </div>
                                            <div className="rectangle-33"></div>
                      
                                            
                                            <div className="text-wrapper-16">date,day</div>
                                            <div className="ellipse-2"></div>
                      
                      
                      
                      
                                           
                                            
                                            <img className="profile" src="img/profile.svg" />
                                          </div>
                                          
                                          </div>
                                       
                                      
                                        
                                        
                                      </div>
                                      
                                      </div>
        
    
        </div>
    
        
    )
}

export default Addtask
