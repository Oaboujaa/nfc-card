import React from 'react'
import './Auth.css'
import loginLogo from "../Assets/SmartCard_Light.png"
import { useState } from 'react'
import { post,postLogin} from '../http/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaBackward } from 'react-icons/fa';
import { Link,useNavigate} from 'react-router-dom';
import {getData,setData} from '../store/Store'
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin =async (e) => {
      e.preventDefault();
      if (!email){
        setError("Merci de saisir l'email ! ")
        console.log("")
        return
      }
      if (!password){
        setError("Merci de saisir le mot de passe ! ")
        return
      }
      const userData={
        data:{email:email,
        password:password}
      }
      const response = await postLogin(userData);
      // setData("id_user",response.id)
      if(Object.keys(response.data).length === 0){
        console.log("response",response.data)
        setError('Email ou Mot de passe invalide')
        return
      }
      setError('')
      setData("id_user",response.data.id_user)
      setData("token",response.data.token)
      navigate('../Dashboard')
      let title="Tableau de bord"
      localStorage.setItem("title", title);
      // const validEmail = 'rzyat';
      // const validPassword = '123';

      // if (email === validEmail && password === validPassword) {
      //   navigate('../Dashboard')
      //   // setError('');
      //   // alert('Login avec succès');
      //   setError('Email ou Mot de passe invalide');
      // }
    };

  return (
    <div className="login-page">
      <img className='login-logo' src={loginLogo} width={200} />
      <form className="login-form" onSubmit={handleLogin}>
        <h1>S'identifier</h1>
          <div className="login-form-group">
            <label className='login-label' htmlFor="email">Email:</label>
            <input className='login-input'  id="email" name="email" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="login-form-group">
            <label className='login-label' htmlFor="password">Mot de passe:</label>
            <input className='login-input' type="password" id="password" name="password" placeholder="Votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='login-button' type="submit">Login</button>
          {error && <div className="error-login-message">{error}</div>}
      </form>
      <div className="login-forgot-password">
        <a href="#">Mot de passe oublié?</a>
      </div>
      <div className="login-no-account">
        Nouveau ici? <a href="/register"> Créer un compte </a>
      </div>
      <div className='back-to-home'>
        <p> <Link to="/" style={{textDecorationLine:'none', color:'black',}}>  <span> <FaBackward/> </span> Revenir à la page d'accueil </Link> </p>
      </div>
    </div>
  )
}

export default Login