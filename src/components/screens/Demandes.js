import React, { useState,useEffect } from 'react'
import { get, getImage, patch, del } from '../../http/api';

import logo from '../../no-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Loading from '../reusable/Loading';

const Demandes = () => {
  return (
    <div className='container'>Demandes</div>
  )
}

export default Demandes