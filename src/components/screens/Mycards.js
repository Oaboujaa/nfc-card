import React, { useState,useEffect } from 'react'
import { get, getImage, patch, del } from '../../http/api';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../no-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faEye } from '@fortawesome/free-solid-svg-icons'
import Loading from '../reusable/Loading';
import NewCard from './NewCard';

const DATA=[
  {"cardName":"carte 1","status":"false","date":"01/01/2023","actions":"actionnnn"},
  {"cardName":"carte 2","status":"false","date":"04/02/2023","actions":"actionnnn"},
  {"cardName":"carte 3","status":"true","date":"23/04/2023","actions":"actionnnn"},
  {"cardName":"carte 4","status":"false","date":"10/02/2022","actions":"actionnnn"}
  
  
]
const Mycards = () => {

  const [showNewCard, setShowNewCard] = useState(false);



  const notify = (e) => {
    const element=e.target
    toast('Here is your toast :'+element.getAttribute('data-id') );
    
  }

  const handleEdit = (e) => {
    let element=e.target.tagName=="path"?e.target.parentNode:e.target
    toast('Here is your toast :'+element.getAttribute('data-id') );
    
  }

  const handelDelete = (e) => {
    let element=e.target.tagName=="path"?e.target.parentNode:e.target
    toast('Here is your toast :'+element.getAttribute('data-id') );
    
  }

  const handleView = (e) => {
    let element=e.target.tagName=="path"?e.target.parentNode:e.target
    toast('Here is your toast :'+element.getAttribute('data-id') );
    
  }


  const handleNewCard = () => {
    setShowNewCard(true);
  };

  const handleHideNewcard = () => {
    setShowNewCard(false)
  }


  return (
    
    <div className='container mycards'>
      <div><Toaster/></div>
      <div className="cards-header">

        {showNewCard ? (
            <NewCard handleHideNewcard={handleHideNewcard} />
          ) : (
            <input type="submit" value="Nouvelle Carte" className="button" onClick={handleNewCard} />
        )}

      </div>
      {showNewCard ? null : (
        <div className="cards-table-container">
            <table className="card-list-table">
              <thead className="card-list-head">
                <tr className="card-list-head-row">
                  <th>Nom de la carte</th>
                  <th>Status</th>
                  <th>Date de création</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="card-list-body">
                {DATA.map((item, index) => (
                  <tr key={index} className="card-table-row">
                    <td>{item.cardName}</td>
                    <td>
                      <input type="checkbox" class="status-checkbox" onClick={notify} data-id={index}/>
                    </td>
                    <td>{item.date}</td>
                    <td>{
                      <div class="actions-container">
                        <FontAwesomeIcon icon={faEdit} className='action-icon' data-id={index} onClick={handleEdit}/>
                        <FontAwesomeIcon icon={faTrash} className='action-icon' data-id={index} onClick={handelDelete}/>
                        <FontAwesomeIcon icon={faEye} className='action-icon' data-id={index} onClick={handleView}/>
                      </div>
                    }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}
      

    </div>
  )
}

export default Mycards