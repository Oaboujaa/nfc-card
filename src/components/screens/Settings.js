import React, { useState,useEffect } from 'react'
import { get, getImage, patch, del } from '../../http/api';

import logo from '../../no-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Loading from '../reusable/Loading';

const Settings = () => {
  const [loading,setLoading]=useState(true)
  const [file, setFile] = useState("");
  const [userData, setUserData] = useState({
                                              fullname: '',
                                              email: '',
                                              password: '',
                                              image: '',
                                            });


  function handleValueChange(e) {
    const { name, value } = e.target;
    console.log(name)

    if (name==="image"){
      const newImage=URL.createObjectURL(e.target.files[0])
      setUserData((prevState) => ({
        ...prevState,
        image: newImage,
      }));
      setFile(newImage);
    }else{
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  
    }

    console.log(userData)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('users/1');
        const imageData = await getImage(response.data.image);
        console.log(imageData)
        setFile(imageData.url)
        console.log(response.data);
        setUserData(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); 
  
  }, []);

  return (
    <div className='container'>
      {loading?
      <Loading/>
      :
      <form className="settings-form">
        <div className="settings-data-container">
          <div className="settings-image-container">
              <img src={file} className="settings-image"/>
              <input type="file" name="image" id="image" className="inputfile" onChange={handleValueChange} hidden/>
              <label htmlFor="image" className="add-image-overlay">
                <FontAwesomeIcon icon={faPlus} className='add-image-button' />
              </label>
          </div>
          <div className="settings-info-container">
            <label htmlFor="fullname">Nom Complet</label>
            <input type="text" id="fullname" name="fullname" className="settings-input"  value={userData.fullname} onChange={handleValueChange} />

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" className="settings-input" disabled value={'oussamaaboujaafar@gmail.com'}/>

            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" className="settings-input"/>

            <label htmlFor="passwordconf">Confirmation</label>
            <input type="password" id="passwordconf" name="passwordconf" className="settings-input"/>
          </div>
        </div>
        <div className="settings-button-container">
    
          <input type="submit" value="Valider" className="button"/>
          
        </div>
      </form> }
    </div>
  )
}

export default Settings
