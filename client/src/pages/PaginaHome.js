import React, { useContext, useEffect, useState } from "react";
// import UserCard from "../components/UserCard";
import Search from "../components/Search";
import { UserContext } from "../UserContext";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../services/firebase'
import Paginacao from "../components/Paginacao";
import Slide from "../components/Slide"


export default function PaginaHome() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [user, loading] = useAuthState(auth);


  const [testes, setTestes] = useState([])
  const [pesquisa, setPesquisa] = useState("")

  useEffect(() => {
    const fetchTestes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/pesquisa/testes?cadeira=${pesquisa}`);
        const data = await response.json();
        setTestes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTestes();
  }, [pesquisa]);

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

  return (
    <>
    {email ? (
        <div className="top">
          <main>
            <Search pesquisa={pesquisa} setPesquisa={setPesquisa} />
            <Paginacao testes={testes} itemsPerPage={6}/>
          </main>
        </div>
      ) : (
        <Slide />
      )}
    </>
  );
}
