import React from 'react'
import * as C from './styles'
import { auth, provider } from "../../services/firebase";

const GoogleLogin = () => {

  const googleLogin = () => {
    auth.signInWithPopup(provider).catch(alert)
}


  return (
    <C.Container onClick={googleLogin}>
      <span>Entre com o Google</span>
      <img src='./img/google.svg' alt='icone do google'></img>
    </C.Container>
  )
}

export default GoogleLogin