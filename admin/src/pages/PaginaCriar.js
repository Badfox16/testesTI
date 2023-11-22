import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import '../style/Criar.css'
import Editor from "../components/Editor";
import { Navigate } from "react-router-dom";

const PaginaCriar = () => {
  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [docente, setDocente] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const anos_criar = Array.from({ length: 10 }, (_, index) => 2023 - index);

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

  async function criarTeste(ev) {
    const data = new FormData();
    data.set("tipo", tipo);
    data.set("cadeira", disciplinaSelecionada);
    data.set("ano", anoSelecionado);
    data.set("semestre", semestreSelecionado)
    data.set("ano_criacao", ano);
    data.set("conteudo", conteudo);
    data.set("docente", docente);
    data.set("file", files[0]);

    ev.preventDefault();

    const response = await fetch("http://localhost:5000/teste", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/ver"} />;
  }

  return (
      <div className="box">
        <div className="title">
          <h2 style={{ color: "#4FC3A1" }}>Criador de Testes e Exames</h2>
        </div>
        <form onSubmit={criarTeste}>

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
                    {ano}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-grupo">

              <label for="semestre">Semestre: </label>
              <select className="input" required
                id="semestre"
                name="semestre"
                value={semestreSelecionado}
                onChange={handleSemestreChange}
              >
                <option value="">Selecione o Semestre</option>
                {semestres.map((semestre, index) => (
                  <option key={index} value={semestre}>
                    {semestre}
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
              <label for="tipo">Tipo de avaliação: </label>
              <select className="input" required
                id="tipo"
                name="tipo"
                value={tipo}
                onChange={(ev) => setTipo(ev.target.value)}
              >
                <option value="" disabled>Selecione o Tipo</option>
                <option value="Primeiro Teste">Teste 1</option>
                <option value="Segundo Teste">Teste 2</option>
                <option value="Exame Normal">Exame - Normal</option>
                <option value="Exame de Recorrência">Exame - Recorrência</option>
              </select>
            </div>
            <div className="form-grupo">
              <label for="ano-criacao">Ano: </label>
              <select className="input" required
                id="ano-criacao"
                name="ano_criacao"
                value={ano}
                onChange={(ev) => setAno(ev.target.value)}
              >
                <option value="" disabled>Selecione o Ano</option>
                {anos_criar.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-linha">
            <div className="form-ficheiro">
              <label for="imagem">Ficheiro: </label><br></br>
              <input className="input" required
                id="imagem"
                type="file"
                name="file"
                onChange={(ev) => setFiles(ev.target.files)}
              />
            </div>
            <div className="form-grupo">
              <label for="docente">Docente: </label>
              <input className="input-text" required
                id="docente"
                type="text"
                name="docente"
                value={docente}
                onChange={(ev) => setDocente(ev.target.value)}
              />
            </div>
          </div>
          <h5>Detalhes</h5>
          <Editor value={conteudo} onChange={setConteudo} />

          <button className="button">Criar Publicação</button>
        </form>
      </div>
  );

};

export default PaginaCriar;
