import React from 'react'
import { useState,useEffect } from 'react';
import BasicDetails from './BasicDetails';
import SocialLinks from './SocialLinks';
import Templates from './Templates';
import './Edition.css'

const EditCardHeader = ({editedCard,handleEditInputChange,handleEditSubmit, id_card}) => {


    const [activeComponent, setActiveComponent] = useState("BasicDetails");
    const handleButtonClick = (component) => {
        setActiveComponent(component);
      };


  return (
    <div className='edit-card-header-container'>
        <div className='edit-card-header-content'>
            <button
                className={activeComponent === 'BasicDetails' ? 'active' : ''}
                onClick={() => handleButtonClick('BasicDetails')}
            >
                Détails de base
            </button>
            <button
                className={activeComponent === 'Templates' ? 'active' : ''}
                onClick={() => handleButtonClick('Templates')}
            >
                Modèles
            </button>
            <button
                className={activeComponent === 'SocialLinks' ? 'active' : ''}
                onClick={() => handleButtonClick('SocialLinks')}
            >
                Liens sociaux - Lien site web
            </button>
        </div>

        {activeComponent === "BasicDetails" && <BasicDetails editedCard={editedCard} handleEditInputChange={handleEditInputChange} handleEditSubmit={handleEditSubmit}/>}
        {activeComponent === "Templates" && <Templates id_card={id_card}  editedCard={editedCard} handleEditInputChange={handleEditInputChange} handleEditSubmit={handleEditSubmit} />}
        {activeComponent === "SocialLinks" && <SocialLinks editedCard={editedCard} handleEditInputChange={handleEditInputChange} handleEditSubmit={handleEditSubmit} />}    
    </div>
  )
}

export default EditCardHeader