import React from 'react'
import "./Edition.css"
import { useState } from 'react';

const BasicDetails = () => {

    const [userInput, setUserInput] = useState('');
    const fixedText = 'https://ouss.sytes.net/';
    const handleInputChange = (event) => {
        const { value } = event.target;
        if (value.startsWith(fixedText)) {
            setUserInput(value);
          } else {
            setUserInput(fixedText + value);
          }
      };


  return (
    <div className='basic-details-container'>
        <div className='basic-details-content'>
            <form className='basic-details-form'>
                <label className="url-alias-label"> Url d'alias </label>
                <input
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder={fixedText}
                    className='url-alias-input'
                    type='text'
                />
               <div className="basic-details-input-row">
                    <div>
                        <label className='basic-details-label'>Nom de la carte</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="card name" />
                    </div>
                    <div>
                        <label className='basic-details-label'>Occupation</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="Occupation" />
                    </div>
                </div>

                <h2 className='basic-details-h2'> Détailles de la carte </h2> 

                <div className="basic-details-input-row">
                    <div>
                        <label className='basic-details-label'>Nom complet</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="full name" />
                    </div>
                    <div>
                        <label className='basic-details-label'>Email</label> <br/>
                        <input className='basic-details-input' type="email" placeholder="email" />
                    </div>
                </div>
                <div className="basic-details-input-row">
                    <div>
                        <label className='basic-details-label'>Phone</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="Phone" />
                        </div>
                        <div>
                        <label className='basic-details-label'>Adresse</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="Adresse" />
                    </div>
                </div>
                <div className="basic-details-input-row">
                    <div>
                        <label className='basic-details-label'>Date de naissance</label> <br/>
                        <input className='basic-details-input' type="date" placeholder="email" />
                    </div>
                    <div>
                        <label className='basic-details-label'>Société</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="Société" />
                    </div>
                </div>
                <div className='basic-details-buttons-flex'>
                    <button className='save-basic'>
                        Sauvegarder
                    </button>
                    <button className='cancel-basic'>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default BasicDetails