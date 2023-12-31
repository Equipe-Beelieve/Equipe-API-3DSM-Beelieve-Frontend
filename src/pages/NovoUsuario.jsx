import React, {useEffect} from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router";
import FormCadastroUsuario from "../components/FormCadastroUsuario/FormCadastroUsuario"


function NovoUsuario() {
  const navigate = useNavigate()
  const {user, autenticado} = useAuth()
	useEffect(() => {
		if(!autenticado){
			navigate("/")
		}
		else if(autenticado && user.cargo !== 'Gerente'){
			navigate("/projetos")
		}
	})
  
  return (
    <>
      <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
        <FormCadastroUsuario />
      </div>
    </>
  );
}

export default NovoUsuario;
