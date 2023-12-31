import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schemaCadastroUsuario from "./validation"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import InputMask from "react-input-mask";

import Button from "../Button"
import axios from "../../services/axios"

function CadastroUsuario() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaCadastroUsuario),
    })

    const gerarJsonUsuario = (data) => {
        const usuario = {
            nome: data.nomeUsuario,
            email: data.emailUsuario,
            cpf: data.cpfUsuario,
            senha: data.senhaUsuario,
            telefone: data.telefoneUsuario,
            cargo: data.cargoUsuario,
            departamento: data.departamentoUsuario,
            is_active: true,
        }

        return usuario
    }

    const cadastrarUsuario = async (data) => {
        const usuarioJson = gerarJsonUsuario(data)

        await axios.post("/usuario/cadastrar", usuarioJson).then((response) => {
            if (response.status === 200) {
                Swal.fire({
                    title: "Cadastro realizado com sucesso!",
                    icon: "success",
                    confirmButtonColor: "#132431",
                    allowOutsideClick: false,
                    allowEscapeKey: false

                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/usuarios")
                    }
                })
            }
            else {
                Swal.fire('Erro ao realizar o cadastro do usuário :(', '', 'error');
            }
        }).catch(error => {
		if (error.response.status === 400) {
			Swal.fire({
			  title: error.response.data,
			  icon: "error",
		  	  confirmButtonColor: "#132431",
              allowOutsideClick: false,
              allowEscapeKey: false
			})
		} else {
			Swal.fire('Erro ao realizar o cadastro :(', '', 'error');
		}	
  	})
    }

    return (
        <form onSubmit={handleSubmit(cadastrarUsuario)}>
            <div className="mt-4 flex flex-col">
                <h1
                    className="font-semibold text-2xl text-center">
                    Cadastro de Usuário
                </h1>
                <div className="mt-8 flex flex-col">
                    <label
                        htmlFor="nomeUsuario"
                        className="text-base font-medium text-on-light">
                        Nome Completo:
                    </label>
                    <input
                        type="text"
                        className="rounded-md border border-n70 p-1 lg:w-1/2"
                        {...register("nomeUsuario")}
                    />
                    {errors.nomeUsuario && (
                        <label className="text-sm font-light text-error">
                            {errors.nomeUsuario.message}
                        </label>
                    )}
                </div>
                <div className="mt-4 flex flex-col">
                    <label
                        htmlFor="emailUsuario"
                        className="text-base font-medium text-on-light lg:w-1/2">
                        Email:
                    </label>
                    <input
                        type="text"
                        className="rounded-md border border-n70 p-1 lg:w-1/2"
                        {...register("emailUsuario")}
                    />
                    {errors.emailUsuario && (
                        <label className="text-sm font-light text-error">
                            {errors.emailUsuario.message}
                        </label>
                    )}
                </div>
                <div className="mt-4 flex flex-col">
                    <label
                        htmlFor="cpfUsuario"
                        className="text-base font-medium text-on-light lg:w-1/2">
                        CPF:
                    </label>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=" "
                        className="rounded-md border border-n70 p-1 lg:w-1/2"
                        {...register("cpfUsuario")}
                    />
                    {errors.cpfUsuario && (
                        <label className="text-sm font-light text-error">
                            {errors.cpfUsuario.message}
                        </label>
                    )}
                </div>
                <div className="mt-4 flex flex-col">
                    <label
                        htmlFor="senhaUsuario"
                        className="text-base font-medium text-on-light">
                        Senha:
                    </label>
                    <input
                        type="password"
                        className="rounded-md border border-n70 p-1 lg:w-1/2"
                        {...register("senhaUsuario")}
                    />
                    {errors.senhaUsuario && (
                        <label className="text-sm font-light text-error">
                            {errors.senhaUsuario.message}
                        </label>
                    )}
                </div>
                <div className="mt-4 flex flex-col">
                    <label
                        htmlFor="confirmarSenhaUsuario"
                        className="text-base font-medium text-on-light">
                        Confirme a Senha:
                    </label>
                    <input
                        type="password"
                        className="rounded-md border border-n70 p-1 lg:w-1/2"
                        {...register("confirmarSenhaUsuario")}
                    />
                    {errors.confirmarSenhaUsuario && (
                        <label className="text-sm font-light text-error">
                            {errors.confirmarSenhaUsuario.message}
                        </label>
                    )}
                </div>
                <div className="justify-between flex-col">
                    <div className="mt-4 flex flex-col">
                        <label
                            htmlFor="telefoneUsuario"
                            className="text-base font-medium text-on-light">
                            Telefone:
                        </label>
                        <InputMask
                            mask="(99) 99999-9999"
                            maskChar="_"
                            className="rounded-md border border-n70 p-1 lg:w-1/2"
                            {...register("telefoneUsuario")}
                        />
                        {errors.telefoneUsuario && (
                            <label className="text-sm font-light text-error">
                                {errors.telefoneUsuario.message}
                            </label>
                        )}
                    </div>
                </div>
                <div className="justify-between flex-col">
                    <div className="mt-4 flex flex-col">
                        <label
                            htmlFor="departamentoUsuario"
                            className="text-base font-medium text-on-light">
                            Departamento:
                        </label>
                        <select className="w-1/2 border rounded border-n70 p-1" {...register("departamentoUsuario")}>
                            <option disabled selected value="">Departamento</option>
                            <option value="Departamento 1">Departamento 1</option>
                            <option value="Departamento 2">Departamento 2</option>
                            <option value="Departamento 3">Departamento 3</option>
                            <option value="Departamento 4">Departamento 4</option>
                            <option value="Departamento 5">Departamento 5</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex flex-col">
                    <label
                        htmlFor="cargoUsuario"
                        className="text-base font-medium text-on-light">
                        Cargo:
                    </label>
                    <select className="w-1/2 border rounded border-n70 p-1" name="cargoUsuario" required {...register("cargoUsuario", { required: true })}>
                        <option disabled selected value="">Cargo</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Engenheiro Chefe">Engenheiro Chefe</option>
                        <option value="Lider de Pacote de Trabalho">Líder de Pacote de Trabalho</option>
                        <option value="Analista">Analista</option>
                    </select>
                </div>
                <div className="mt-5 flex justify-end gap-5">
                    <Button
                        texto="Cancelar"
                        tipo="button"
                        className="rounded-[10px] border-2 border-bg22 p-2 text-lg font-semibold text-bg22"
                        onClick={() => navigate("/usuarios")}
                    />
                    <Button
                        texto="Cadastrar"
                        tipo="submit"
                        className="rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
                    />
                </div>
            </div>
        </form>
    )
}

export default CadastroUsuario