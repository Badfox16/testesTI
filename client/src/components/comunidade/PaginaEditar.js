import React, { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import './Criar.css'
import Editor from "../Editor"
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../services/firebase'

const PaginaEditar = () => {
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

  const nome = `${userInfo?.nome} ${userInfo?.apelido}` || user?.nome;

  useEffect(() => {
    if (nome) {
      setAutor(nome);
    }
  }, [nome]);

  const [tipo, setTipo] = useState("");
  const [autor, setAutor] = useState("");
  const [titulo, setTitulo] = useState("")
  const [detalhes, setDetalhes] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);


  //fetch das cadeiras pela base de dados
  const [disciplinas, setDisciplinas] = useState([]);
  const [anos, setAnos] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [nomesDisciplinas, setNomesDisciplinas] = useState([]);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('');
  const [anoSelecionado, setAnoSelecionado] = useState('');
  const [semestreSelecionado, setSemestreSelecionado] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/disciplinas')
      .then(response => response.json())
      .then(data => {
        setDisciplinas(data);
        const uniqueAnos = [...new Set(data.map(item => item.ano))];
        setAnos(uniqueAnos);
        const uniqueSemestres = [...new Set(data.map(item => item.semestre))];
        setSemestres(uniqueSemestres);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAnoChange = (e) => {
    setAnoSelecionado(e.target.value);
    const filteredDisciplinas = disciplinas.filter(disciplina => disciplina.ano === parseInt(e.target.value));
    if (semestreSelecionado) {
      const filteredBySemestre = filteredDisciplinas.filter(disciplina => disciplina.semestre === parseInt(semestreSelecionado));
      const uniqueNomesDisciplinas = [...new Set(filteredBySemestre.map(item => item.nome))];
      setNomesDisciplinas(uniqueNomesDisciplinas);
    } else {
      const uniqueNomesDisciplinas = [...new Set(filteredDisciplinas.map(item => item.nome))];
      setNomesDisciplinas(uniqueNomesDisciplinas);
    }
  };

  const handleSemestreChange = (e) => {
    setSemestreSelecionado(e.target.value);
    const filteredDisciplinas = disciplinas.filter(disciplina => disciplina.semestre === parseInt(e.target.value));
    if (anoSelecionado) {
      const filteredByAno = filteredDisciplinas.filter(disciplina => disciplina.ano === parseInt(anoSelecionado));
      const uniqueNomesDisciplinas = [...new Set(filteredByAno.map(item => item.nome))];
      setNomesDisciplinas(uniqueNomesDisciplinas);
    } else {
      const uniqueNomesDisciplinas = [...new Set(filteredDisciplinas.map(item => item.nome))];
      setNomesDisciplinas(uniqueNomesDisciplinas);
    }
  };

  // Dados da contribuicao em questao
  const [contribuicaoInfo, setContribuicaoInfo] = useState(null)
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/contribuicao/${id}`)
      .then(response => {
        response.json().then(contribuicao => {
          setContribuicaoInfo(contribuicao)
          setTipo(contribuicao.tipo);
          setTitulo(contribuicao.titulo);
          setAutor(contribuicao.autor);
          setDetalhes(contribuicao.detalhes);
          setAnoSelecionado(contribuicao.ano);
          setDisciplinaSelecionada(contribuicao.cadeira);
        })
      })
  }, []);


  async function atualizarContribuicao(ev) {
    const data = new FormData();
    data.set("autor", autor)
    data.set("tipo", tipo);
    data.set("titulo", titulo);
    data.set("cadeira", disciplinaSelecionada);
    data.set("ano", anoSelecionado);
    data.set("semestre", semestreSelecionado)
    data.set("detalhes", detalhes);
    data.set("id", id)
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    ev.preventDefault()
    
    const response = await fetch('http://localhost:5000/contribuicao', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/comunidade"} />;
  }

  return (
    <div className="box">
      <div className="title">
        <h2 style={{ color: "#ff5757" }}>Crie uma publicação e interaja com a comunidade</h2>
      </div>
      <form onSubmit={atualizarContribuicao}>

        {/* Primeira linha do formulario */}
        <div className="form-linha">
          <div className="form-grupo">
            <label for="ano">Ano de frequência: </label>
            <select className="input"
              id="ano"
              name="ano"
              value={anoSelecionado}
              onChange={handleAnoChange}
              required
            >
              <option value="">Selecione o Ano</option>
              {anos.map((ano, index) => (
                <option key={index} value={ano}>
                  {`${ano}° ano`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-grupo">

            <label for="semestre">Semestre:({contribuicaoInfo?.semestre}) </label>
            <select className="input" required
              id="semestre"
              name="semestre"
              value={semestreSelecionado}
              onChange={handleSemestreChange}
            >
              <option value="">Selecione o Semestre</option>
              {semestres.map((semestre, index) => (
                <option key={index} value={semestre}>
                  {`${semestre}° semestre`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-grupo">

            <label for="cadeira">Disciplina: </label>
            <select className="input" required
              id="cadeira"
              name="cadeira"
              value={disciplinaSelecionada}
              onChange={(ev) => setDisciplinaSelecionada(ev.target.value)}
            >
              <option value="" disabled>Selecione a Disciplina</option>
              {nomesDisciplinas.map((disciplina, index) => (
                <option key={index} value={disciplina}>
                  {disciplina}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Segunda linha do formulario */}
        <div className="form-linha">
          <div className="form-grupo">
            <label for="tipo">Tipo: </label>
            <select className="input" required
              id="tipo"
              name="tipo"
              value={tipo}
              onChange={(ev) => setTipo(ev.target.value)}
            >
              <option value="" disabled>Selecione o Tipo</option>
              <option value="Contribuição">Contribuição</option>
              <option value="Dúvida">Dúvida</option>
            </select>
          </div>
          <div className="form-ficheiro">
            <label for="imagem">Ficheiro: </label><br></br>
            <input className="input"
              id="imagem"
              type="file"
              name="file"
              onChange={(ev) => setFiles(ev.target.files)}
            />
          </div>
          <input type="text" hidden value={autor} />
        </div>
        {/* Titulo */}
        <div className="form-linha">
          <div className="form-grupo">
            <label for="tipo">Titulo: </label>
            <input className="input-text" required
              id="titulo"
              name="titulo"
              value={titulo}
              onChange={(ev) => setTitulo(ev.target.value)}
            />
          </div>
        </div>
        {/* Editor */}
        <div className="form-linha">
          <div className="form-grupo">
            <h4 className="desc">Detalhes: </h4>
            <Editor value={detalhes} onChange={setDetalhes} />
          </div>
        </div>
        <button className="button">Submeter</button>
      </form>
    </div>
  )
}

export default PaginaEditar