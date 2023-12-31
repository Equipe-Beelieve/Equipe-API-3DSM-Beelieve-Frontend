import React from "react"
import TabFormTarefas from "./TabFormTarefas"

import { useLocation, useParams, useNavigate } from "react-router"

import { AiOutlineArrowLeft } from "react-icons/ai"


function NovaTarefa() {
  const navigate = useNavigate()
  const { idTarefa } = useParams()

  const location = useLocation()
  const { tipo_pai, subprojeto, nomeProjeto, dataInicioProjeto, idProjeto } = location.state

  let ordemSubProjeto = ""
  let nomeSubProjeto = ""
  let progressoSubProjeto = ""

  if (tipo_pai === "subprojeto") {
    ordemSubProjeto = subprojeto.ordem_sub_projeto
    nomeSubProjeto = subprojeto.nome_sub_projeto
    progressoSubProjeto = subprojeto.progresso_sub_projeto
  } else {
    ordemSubProjeto = subprojeto.ordem_nivel_sub_projeto
    nomeSubProjeto = subprojeto.nome_nivel_sub_projeto
    progressoSubProjeto = subprojeto.progresso_nivel_sub_projeto
  }

  return (
    <>
      <button
        onClick={() => navigate(`/projetos/${idProjeto}`, {state: {tela: "pacotes"}})}
        className="text-gray-50 ml-10 flex items-center font-semibold underline"
      >
        <AiOutlineArrowLeft className="mr-2" />
        Voltar
      </button>
      <div className="m-5 rounded-md bg-bg100 p-7 drop-shadow-md">
        <div>
          <TabFormTarefas
            listaTarefas={subprojeto.tarefas}
            tipoPai={tipo_pai}
            idPai={idTarefa}
            ordem={ordemSubProjeto}
            nomePacote={nomeSubProjeto}
            nomeProjeto={nomeProjeto}
            dataInicioProjeto={dataInicioProjeto}
            progressoPacote={progressoSubProjeto}
          />
        </div>
      </div>
    </>
  )
}

export default NovaTarefa
