import React, { useState,useEffect } from 'react'
import { getImage, patch } from '../../http/api';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../no-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faEye } from '@fortawesome/free-solid-svg-icons'
import Loading from '../reusable/Loading';
import NewCard from './NewCard';
import EditCard from './EditCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { get, del, post } from '../../http/api';

// const DATA=[
//   {"cardName":"carte 1","status":"false","date":"01/01/2023","actions":"actionnnn"},
//   {"cardName":"carte 2","status":"false","date":"04/02/2023","actions":"actionnnn"},
//   {"cardName":"carte 3","status":"true","date":"23/04/2023","actions":"actionnnn"},
//   {"cardName":"carte 4","status":"false","date":"10/02/2022","actions":"actionnnn"}
// ]


const Mycards = () => {

  const { rndId } = useParams();

  const [userCards, setUserCards] = useState([]);



  const [status, setStatus] = useState(false)

  const [showNewCard, setShowNewCard] = useState(false);

  const [showEditCard, setShowEditCard] = useState(false);

  const [selectedCard, setSelectedCard] = useState(0);



  const notify = (e) => {
    const element=e.target
    toast('Here is your toast :'+element.getAttribute('data-id') );
    
  }

  // const handleEdit = (e) => {
  //   let element=e.target.tagName=="path"?e.target.parentNode:e.target
  //   toast('Here is your toast :'+element.getAttribute('data-id') );    
  // }
  

  // const handleStatusChange = async () => {
  //   try {
  //     const updatedStatus = !status;
  //     setStatus(updatedStatus);
      
  //     const statusValue = {
  //       status: updatedStatus
  //     }
  //     const response = await post(`cards`, statusValue);
  //     console.log('Response:', response);
  //   } catch (error) {
  //     console.error('Error updating status:', error);
  //   }
  // };

  const handleCheckboxChange = async (e) => {
    console.log("Event object:", e);
    const newStatus = e.target.checked ? 1 : 0;
    setStatus(e.target.checked);
    try {
      const data = {
        status: newStatus,
      };
      const response = await post('http://ouss.sytes.net:5000/api/cards', data);
    } catch (error) {
      console.log(error);
    }
  };
  

 



  const handleShowEditCard = (e) => {
    setShowEditCard(true)
    let element=e.target.tagName=="path"?e.target.parentNode:e.target
    setSelectedCard(userCards[element.getAttribute('data-id')].id)
  }

  const handleHideEditCard = () => {
    setShowEditCard(false)
  }

  // const handelDelete = (e) => {
  //   let element=e.target.tagName=="path"?e.target.parentNode:e.target
  //   toast('Here is your toast :'+element.getAttribute('data-id') );
    
  // }

  // const handleDeleteCard = async (id_card) => {
  //   try {
  //     const response = await del(`cards/`+id_card);
  //     setUserCards(prevUserCards => prevUserCards.filter(card => card.id_card !== id_card));
  //   } catch (error) {
  //     console.error('Error deleting card:', error);
  //   }
  // };

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

  // if (userData === null) {
  //   return <div>Loading...</div>;
  // }



  useEffect(() => {
    const fetchCardData = async() => {
      try {
        const id_user = localStorage.getItem("id_user");
        const response = await get('cards/'+id_user);
        setUserCards(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchCardData();

  },[showNewCard])


  return (
    
    <div className='container mycards'>
      {showEditCard ? (
        <EditCard id_card={selectedCard} handleHideEditCard={handleHideEditCard} />
      ) : (
        <>
          <div><Toaster/></div>
            <div className="cards-header">

              {showNewCard ? (
                  <NewCard handleHideNewcard={handleHideNewcard} />
                ) : (
                  <input type="submit"  value="Nouvelle Carte" className="button" onClick={handleNewCard} />
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
                      {userCards.map((cards, index, card) => (
                        <tr key={index}>
                          <td>
                            {cards.card_name}
                          </td>
                          <td>
                            <input type="checkbox" name='status' className="mycards-status-checkbox" checked={status[index]} onChange={()=> handleCheckboxChange(index)}  data-id={index}/>
                          </td>
                          <td>
                            {new Date(cards.card_date).toLocaleString()}
                          </td>
                          <td>
                            {
                              <div className="actions-container">
                                <FontAwesomeIcon icon={faEdit} className='action-icon' data-id={index} onClick={handleShowEditCard}/>
                                <FontAwesomeIcon icon={faTrash} className='action-icon' data-id={index} />
                                <FontAwesomeIcon icon={faEye} className='action-icon' data-id={index} onClick={handleView}/>
                              </div>
                            }
                          </td>
                        </tr>
                      ))}

                      {/* {DATA.map((item, index) => (
                        <tr key={index} className="card-table-row">
                            <td>{item.cardName}</td>
                          <td>
                            <input type="checkbox" className="status-checkbox" onClick={notify} data-id={index}/>
                          </td>
                          <td>{item.date}</td>
                          <td>{
                            <div className="actions-container">
                              <FontAwesomeIcon icon={faEdit} className='action-icon' data-id={index} onClick={handleShowEditCard}/>
                              <FontAwesomeIcon icon={faTrash} className='action-icon' data-id={index} onClick={handelDelete}/>
                              <FontAwesomeIcon icon={faEye} className='action-icon' data-id={index} onClick={handleView}/>
                            </div>
                          }</td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </div>
            )}
        </>
      )
      
      }
      

    </div>
  )
}

export default Mycards