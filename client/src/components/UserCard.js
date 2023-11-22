import React, { useContext} from "react";
import { UserContext } from "../UserContext";
import '../style/UserCard.css';

export default function UserCard({email}) {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { nome, apelido } = userInfo;
  
  return (
    <div>
      <div class="card-user">
        <div class="banner">
        </div>
        <h2 class="name">{nome} {apelido}</h2>
        <div class="title">{email}</div>
        <div class="actions">
          <div class="follow-btn">
            <button>Editar</button>
          </div>
        </div>
       
      </div>
    </div>
  )
}