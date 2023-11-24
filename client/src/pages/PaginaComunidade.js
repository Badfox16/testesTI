import React, { useContext, useEffect, useState } from "react";
import CardComunidade from "../components/comunidade/card";
import { UserContext } from "../UserContext";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../services/firebase'
import Slide from "../components/Slide"
import Paginacao from "../components/comunidade/Paginacao";



export default function PaginaComunidade() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) {
          db.collection("usuarios").doc(user.uid).set({
            email: user.email,
            nome: user.displayName,
            photoURL: user.photoURL,
          });
        }
      }, [user]);

    const email = userInfo?.email || user?.email;

    const [contribuicoes, setContribuicoes] = useState([])
    const [pesquisa, setPesquisa] = useState("")
  
    useEffect(() => {
      const fetchTestes = async () => {
        try {
          const response = await fetch(`http://localhost:5000/pesquisa/contribuicoes?tipo=${pesquisa}`);
          const data = await response.json();
          setContribuicoes(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchTestes();
    }, [pesquisa]);

    return(
        <>
        {email ? (
            <Paginacao contribuicoes={contribuicoes} itemsPerPage={6}/> 
            ) : (
        <Slide />
      )}
    </>
    )
}