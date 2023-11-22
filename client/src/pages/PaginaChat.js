import React, { useContext, useState, useEffect } from "react";
import '../style/Chat.css';
import Slide from "../components/Slide"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../services/firebase'
import { UserContext } from "../UserContext";

export default function PaginaChat() {
    const [resposta, setResposta] = useState(null)
    const [pergunta, setPergunta] = useState("")
    const [prevChats, setPrevChats] = useState([])
    const [currentTitle, setCurrentTitle] = useState(null)
    const [user, loading] = useAuthState(auth)
    const { setUserInfo, userInfo } = useContext(UserContext)

    const criarNovoChat = () => {
        setResposta(null)
        setPergunta("")
        setCurrentTitle(null)
    }

    const handleClick = (titulo) => {
        setCurrentTitle(titulo)
        setResposta(null)
        setPergunta("")
    }

    const getMessages = async () => {
        const options = {
            method: "POST",
            body: JSON.stringify({
                pergunta: pergunta
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch('http://localhost:5000/respostas', options)
            const data = await response.json()
            // console.log(data)
            setResposta(data.choices[0].message).then(setPergunta(""))


        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log(currentTitle, pergunta, resposta);
        if (!currentTitle && pergunta && resposta) {
            setCurrentTitle(pergunta)
        }
        if (currentTitle && pergunta && resposta) {
            setPrevChats(prevChats => (
                [...prevChats,
                {
                    title: currentTitle,
                    role: "user",
                    content: pergunta
                },
                {
                    title: currentTitle,
                    role: resposta.role,
                    content: resposta.content
                }
                ]
            ))
        }
    }, [resposta, currentTitle])

    useEffect(() => {
        if (user) {
            db.collection("usuarios").doc(user.uid).set({
                email: user.email,
                nome: user.displayName,
                photoURL: user.photoURL,
            });
        }
    }, [user]);


    const currentChat = prevChats.filter(prev => prev.title === currentTitle)
    const uniqueTitle = Array.from(new Set(prevChats.map(prev => prev.title)))

    const email = userInfo?.email || user?.email;

    return (
        <>
            {email ? (
                <div className="chat">
                    <section className="side-bar">
                        <button onClick={criarNovoChat}>+ Nova conversa</button>
                        <ul className="history">
                            {uniqueTitle?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
                        </ul>
                        <nav>
                            <p>Feito de TI para TI por Mutizo Maita</p>
                        </nav>
                    </section>
                    <section className="main-chat">
                        <div className="top-section">
                            <ul className="feed">
                                {currentChat?.map((chatMessage, index) => (
                                    <li key={index}>
                                        {chatMessage.role === "user" ? (
                                            <p className="role">{userInfo?.nome || user?.displayName}</p>
                                        ) : (
                                            <p className="role">{`Assistente ->`}</p>
                                        )}
                                        <p>{chatMessage.content}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bottom-section">
                            <div className="input-container">
                                <input type="text"
                                    placeholder="Insira a sua pergunta"
                                    value={pergunta}
                                    onChange={(e) => setPergunta(e.target.value)} />
                                <div id="submeter" onClick={getMessages}>➢</div>
                            </div>
                            <p className="info">
                                ChatGPT can make mistakes. Verify important information. ChatGPT can make mistakes. Verify important information.
                            </p>
                        </div>
                    </section>
                </div>
            ) : (
                <Slide />
            )}
        </>
    )
}
