import React, { useState } from "react";
import { useForm } from "react-hook-form";
//Custom components
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";
import { DateInput } from "./DateInput"
import { SubmitMessage } from "./SubmitMessage";
//Custom helpers
import { dateToSql } from "../helpers/dateToSql";
import { authenticate } from "../helpers/authenticate"
import { validateAge } from "../helpers/validateAge"
import { postRequest } from "../helpers/postRequest";
import { emailRequest } from "../helpers/emailRequest"

export const InscriptionForm = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });
	const [startDate, setStartDate] = useState({
		date: new Date(),
		validated: false
	});
	const [message, setMessage] = useState({
		status:false,
		success:false,
		message:''
	})
	const [disabled, setDisabled] = useState(false)
	const [loading, setLoading] = useState(false)
	
	//Submit event handler
	const onSubmit = async (data, e) => {
		e.preventDefault();
		setMessage({message, status:false})
		//Full name build
		data.nombrePostulante = data.nombrePostulante.trim() + ' ' + data.apellido.trim();
		//Validate user age 
		const fechaNacimiento = validateAge(startDate)
		if (fechaNacimiento.validated) {
			data.fechaNacimiento = dateToSql(fechaNacimiento.date)
			setDisabled(true)
			setLoading(true)
			//Validate token
			const token = await authenticate()
			if (token) {
				//Post to db
				postRequest(token.token, data)
				.then(response => {return response.json() })
				.then(json => {
					if (json.status == 200){
						//Send email
						console.log('Added to DB')
						setMessage({message, success: true, status:true, message:'INSCRIPCIÓN REALIZADA'})
						emailRequest(data)
						.then(response => {return response.json()})
						.then(json => {
							console.log(json.message)
						})
						return

					}else if (json.status==400){
						setMessage({message, success: false, status:true, message:'PERSONA YA INSCRIPTA'})
					}
					console.log(json.message)
					setLoading(false)
				})
				.catch(error => {
					setLoading(false)
					setMessage({message, success:false,  status:true, message:'ERROR. Intente más tarde.'})			
				})
			} else{
				setMessage({message, success:false,  status:true, message:'ERROR. Intente más tarde.'})			
				setLoading(false)

			}
		}	else {
			setDisabled(false)
		}
		setTimeout(() => setDisabled(false), 1500)
	}

	const grupoFamiliarOptions = [
		{
			option:'Con grupo familiar',
			value: 1
		},
		{
			option:'Sin grupo familiar',
			value: 0
		}
	];
	
	return (
		<div className='flex flex-col w-full  items-center justify-center pb-10 mt-6'>
		
			<form onChange={() => { if (!message.success) setMessage({message, status:false}) }} className=' rounded-md glass card-shadow w-5/6 lg:w-1/2   pb-10 py-6 my-2 lg:my-6 flex flex-col items-center justify-center ' onSubmit={ handleSubmit(onSubmit)}>
				<p className='mb-2 lg:mb-6 lg:text-lg text-gray-800  font-bold border-b-4 border-green rounded max-w-max'>Formulario de inscripción</p>
    		<TextInput icon={'fas fa-user'} key={'asd'} value='nombrePostulante' errors={errors.nombrePostulante}  placeholder='Nombre' register={register} required={true}/>
    		<TextInput icon={'fas fa-user'} key={'asd1'} value='apellido' errors={errors.apellido} placeholder='Apellido' register={register}  required={true}/>
    		<TextInput icon={'fas fa-id-card'} type={'dni'} key={'asd2'} value='dniPostulante' errors={errors.dniPostulante}  placeholder='Documento (DNI)' register={register} required={true}/>
    		<DateInput icon={'fas fa-calendar-alt'} startDate={startDate} setStartDate={setStartDate}/>
				<TextInput icon={'fas fa-envelope'} type={'email'} key={'asd4'} value='emailPostulante' errors={errors.emailPostulante}  placeholder='Correo electrónico' register={register} required={true}/>
    		<TextInput icon={'fas fa-phone-alt'} type={'tel'} key={'asd5'} value='telPostulante' errors={errors.telPostulante}  placeholder='Teléfono / Celular' register={register} required={true}/>
    		<TextInput icon={'fas fa-building'} key={'asd6'} value='empresaPostulante' errors={errors.empresaPostulante} placeholder='Empresa' register={register} required={true} />
				<SelectInput icon={'fas fa-users'} placer={'Grupo familiar'} key={'asd7'} options={grupoFamiliarOptions} placeholder='Grupo familiar' value='estadocivil' errors={errors.estadocivil} register={register} required={true} />				
				{!message.success ? <button disabled={disabled} className='mt-4 w-32 h-10 tracking-wider  flex items-center justify-center cursor-pointer transition hover-bg-green rounded  px-4 py-2 bg-green text-gray-100 font-semibold hover-press-animation hover:shadow-2xl  text-shadow' type="submit">{	loading ? <div class="lds-dual-ring	text-shadow "/> : <span className='text-shadow'>INSCRIBIRSE</span> }</button> : ''}
				<SubmitMessage message={message} />
				
			</form>
		</div>
	)
}