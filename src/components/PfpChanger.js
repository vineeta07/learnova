import React, { useState, useEffect } from 'react';
import { app } from '../Firebase';
import { getAuth, signOut } from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

function PfpChanger() {
  const [avatar, setAvatar] = useState(() => localStorage.getItem('profile-avatar') || '');
  const avatars = ['/img/avatar1.png', '/img/avatar2.png', '/img/avatar3.png','/img/avatar4.png','/img/avatar5.png','/img/avatar6.png','/img/avatar7.png'];
  
 function AvatarPicker({ selected, onPick }) {
  // If an avatar is selected, show only that one
  if (selected && selected !== '') {
    return (
      <div>
       <br/>
       
        <button
          style={{ marginLeft: 16,   fontSize: '0.8rem',padding: '5px 13px', cursor: 'pointer' ,borderRadius: '6px', }}
          onClick={() => onPick('')}
        >
          Choose avatar
        </button>
      </div>
    );
  }

  // If no avatar is selected, show all options
  return (
    <div>
      {avatars.map((src) => (
        <img
          key={src}
          src={src}
          alt="avatar"
          width={60}
          style={{
            margin: 8,
            cursor: 'pointer',
            border: '2px solid transparent',
            borderRadius: '50%'
          }}
          onClick={() => onPick(src)}
        />
      ))}
    </div>
  );
}

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        localStorage.setItem('profile-avatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
   
  const navigate = useNavigate('')
  const Logout =()=>{
      const auth = getAuth(app)
      signOut(auth).then(res=>{
        navigate('/login')
      })
    }
  return (
    <div >
      <img
        src={avatar || '/img/avatar4.png'}
        alt="Profile"
        width={100}
        style={{ borderRadius: '50%', width:'200px', marginTop:'-33px',marginLeft:'-18px',objectFit: 'cover',allignItem:'flex-left', objectFit: 'cover', marginBottom: '0px',    border: avatar === '/img/avatar6.png' ? 'none' : '3px solid black' }}
      />

       <AvatarPicker selected={avatar} onPick={(src) =>{ setAvatar(src);  localStorage.setItem('profile-avatar', src);}} />
        <br/>
        <label
          style={{ marginLeft: 16, padding: '3px 10px', cursor: 'pointer',
          background: ' #eee',
          border: '1px solid black',
          borderRadius: '6px',
          display: 'inline-block' ,
          fontSize: '0.9rem'}}
          
        >
      Choose profile
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </label>
     <br/>
      <br/>
     
     
     
     <button type='button' onClick={Logout} style ={ {color: 'purple',
                    width: '130px',      // Set the width you want
                     padding: '7px',   // Optional: makes the button taller
                    fontSize: '1.1rem',
                    borderRadius: '6px',
                    fontWeight: 'bold', 
                    marginLeft:'10px' 
                  }}>Log Out</button>
     
    </div>
  );
}

export default PfpChanger;
