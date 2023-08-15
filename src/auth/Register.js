import React, { useEffect, useState } from 'react';
import './Auth.css';
import loginLogo from "../Assets/SmartCard_Light.png"
import { post } from '../http/api';


const Register = () => {
  // const [fullName, setFullName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     setError('Les mots de passes sont différents');
  //     return;
  //   }

  //   console.log('Registration details:', {
  //     fullName,
  //     email,
  //     password,
  //     confirmPassword,
  //     agreeTerms,
  //   });
  // };

  const [registerData, setRegisterData] = useState({
    fullname: '',
    email: '',
    password:'',
    id_user:''
  });

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      // const id_user = localStorage.getItem("id_user");
      // registerData.id_user = Number(id_user);
      const response = await post('users/', registerData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-page">
      <img className='login-logo' src={loginLogo} width={200} />
      
      <form className="register-form" onSubmit={handleRegisterSubmit}>
      
        <h1> Créer votre compte </h1>

            <label className='label-register' htmlFor="fullname"> Nom complet </label>
            <input
              className='input-register'
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Nom complet"
              value={registerData.fullname}
              onChange={handleRegisterChange}
            />
            {/* <label className='label-register' htmlFor="lastName">Nom</label>
            <input
              className='input-register'
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            /> */}
            <label className='label-register' htmlFor="email">Email</label>
            <input
              className='input-register'
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
            />
          <label className='label-register' htmlFor="password">Mot de passe</label>
          <input
            className='input-register'
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            value={registerData.password}
            onChange={handleRegisterChange}
          />
          {/* <label className='label-register' htmlFor="confirmPassword">Confirme le</label>
          <input
            className='input-register'
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirme le"
            value={confirmPassword}
            onChange={handleRegisterChange}
          /> */}
        {/* <div className="register-form-group-check">
          <label className='label-register'>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            J'accepte les termes et conditions
          </label>
        </div> */}
        {error && <div className="register-error-message">{error}</div>}
        <button className='register-button' type="submit">S'inscrire</button>
      </form>
      <div className="register-login-link">
        Avez-vous dèja un compte? <a href="/login"> Se connecter </a>
      </div>
    </div>
  );
};

export default Register;
