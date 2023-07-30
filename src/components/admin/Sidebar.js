import React,{Fragment,useRef,useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser,faChartSimple,faIdCard,faList,faRightFromBracket,faGear } from '@fortawesome/free-solid-svg-icons'
import CloseIcon from '../reusable/CloseIcon';


const Sidebar = ({updateTitle}) => {
  const [open,setOpen]=useState(true)
  const [title,setTitle]=useState("Tableau de bord")

  const openSidebar = () => {
    setOpen(!open)
  }
  
  const handleItemClick = (event) => {
    let itemText = event.currentTarget.textContent;
    if (itemText==""){
      itemText="Mon compte"
    }
    console.log(itemText)
     setTitle(itemText)
     updateTitle(itemText)
  };
  return (
    <Fragment>
        <CloseIcon opened={open} openSidebar={openSidebar}/>
        
      <div className={"sidebar "+(!open?"closed":"")}>

        <div className="sidebar-top">
          <FontAwesomeIcon icon={faCircleUser}  className='icon-fa-user'/>
          <FontAwesomeIcon icon={faGear} className='icon-settings' onClick={handleItemClick}/>
          <h2 className='sidebar-text'>Oussama Aboujaafaer</h2>
        </div>

        <div className="sidebar-items">
          <div className="sidebar-item" onClick={handleItemClick}>
            <FontAwesomeIcon icon={faChartSimple} className={'icon-sidebar-item '+(title==="Tableau de bord"?"selected-icon":"")} />
            <p className={'sidebar-text '+(title==="Tableau de bord"?"selected-text":"")}>Tableau de bord</p>
          </div>
          <div className="sidebar-item" onClick={handleItemClick}>
            <FontAwesomeIcon icon={faIdCard} className={'icon-sidebar-item '+(title==="Mes cartes"?"selected-icon":"")} />
            <p className={'sidebar-text '+(title==="Mes cartes"?"selected-text":"")}>Mes cartes</p>
          </div>
          <div className="sidebar-item" onClick={handleItemClick}>
            <FontAwesomeIcon icon={faList} className={'icon-sidebar-item '+(title==="Demandes"?"selected-icon":"")} />
            <p className={'sidebar-text '+(title==="Demandes"?"selected-text":"")}>Demandes</p>
          </div>
        </div>

        <div className="sidebar-bottom">
          <FontAwesomeIcon icon={faRightFromBracket}  className='icon-fa-user'/>
          <h2 className='sidebar-text'>Se déconnecter</h2>
        </div>
    </div>
    </Fragment>

  )
}

export default Sidebar
