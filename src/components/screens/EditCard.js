import React from 'react'
import "./EditCard.css"
import EditCardHeader from './EditCardScreens/EditCardHeader'

const EditCard = ({handleHideEditCard}) => {
  return (
    <div className='edit-card-container'>
        <div className='edit-card-header'>
            <div className='edit-card-title'>
                Modifier votre carte
            </div>
            <div className='edit-card-button'>
                <button onClick={handleHideEditCard} className='edit-card-back-button'>
                    Retour
                </button>
            </div>
        </div>
        <div>
            <EditCardHeader/>
        </div>
        {/* <div className='edit-card-content'>
            <div className='edit-card-upon-form'>
                <form>
                    <h2> Détails de la carte </h2>
                    <label> Nom complet </label>
                    <input type='text' />
                    <label> Email </label>
                    <input type='email' />
                    <label> Téléphone </label>
                    <input type='text' />
                    <label> Adresse </label>
                    <input type='text' />
                    <label> Date de naissance </label>
                    <input type='text' />
                    <label> Société </label>
                    <input type='text' />
                    <label> Fonction </label>
                    <input type='text' />
                    <label> Nom complet </label>
                    <input type='text' />
                </form>
            </div>
        </div> */}
    </div>
  )
}

export default EditCard