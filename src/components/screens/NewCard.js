import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import backImage from "../../no-image.png"
import "./new-card.css"

const NewCard = () => {

  const [backgroundImage, setBackgroundImage] = useState(backImage);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showEditIcon, setShowEditIcon] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openImageUploader = () => {
    document.getElementById('image-upload').click();
  };

  const handleMouseEnter = () => {
    setShowEditIcon(true);
  };

  const handleMouseLeave = () => {
    setShowEditIcon(false);
  };



  return (
    <div className='new-card-container'>
      <div className='new-card-content'>
        <div className='title-button-newcard-flex'>
          <div className='new-card-title'>
            <p> Nouvelle carte digitale </p>
          </div>
          <div className='new-card-button'>
            <button> Retour </button>
          </div>
        </div>
        <div className='new-card-under-title'>
          <div className='new-card-form-group'>
            <form>
              <div>
                <label> Url d'alias </label>
                <input type='text' placeholder='URL de ma page' />
                <label> Nom de la carte </label>
                <input type='text' placeholder='Entrez le nom de votre carte' />
                <label> Occupation </label>
                <input type='text' placeholder='Entrez votre profession' />
                  <div className='new-card-image-picker'>
                    <label> Image de profil </label>
                      <div
                        className="new-card-image-container"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ backgroundImage: `url(${backgroundImage})`, width:"150px", height:"150px" }}
                      >
                        {uploadedImage && (
                          <img src={uploadedImage} alt="Uploaded Image" className="new-card-uploaded-image" />
                        )}
                        {!uploadedImage && <div className="new-card-overlay" />}
                        {showEditIcon && (
                          <div className="new-card-edit-icon" onClick={openImageUploader}>
                            <FontAwesomeIcon icon={faEdit} />
                          </div>
                        )}
                        <input type="file" id="image-upload" style={{ display: 'none' }} onChange={handleImageUpload} />
                      </div>
                  </div>
              </div>
              <div className='new-card-flex-buttons'>
                <button className='new-card-firstb'>
                  Sauvegarder
                </button>
                <button className='new-card-secondb'>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCard