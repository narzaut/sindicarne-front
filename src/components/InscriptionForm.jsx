import React, { useState } from "react";
import { useForm } from "react-hook-form";
//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { registerLocale } from  "react-datepicker";
//Custom components
import { TextInput } from "./FormInput";
import { SelectInput } from "./SelectInput";
//Helpers
import { dateToSql } from "../helpers/dateToSql";
import { authenticate } from "../helpers/authenticate"
import { validateAge } from "../helpers/validateAge"
import { postRequest } from "../helpers/postRequest";
import { emailRequest } from "../helpers/emailRequest"

export const InscriptionForm = () => {
	registerLocale('es', es);
	const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });
	const [startDate, setStartDate] = useState({
		date: new Date(),
		validated: false
	});
	const [disabled, setDisabled] = useState(false)
	const [message, setMessage] = useState({
		status:false,
		success:false,
		message:''
	})

	//Conditional css
	let errorBorder;
	let messageStyle;
	startDate.date.getFullYear() > new Date().getFullYear() - 17  ? errorBorder=' focus:border-red-500' : errorBorder=' focus-border-green'
	message.success == true ? messageStyle = 'font-bold text-green-400' : messageStyle = 'pt-4 text-sm lg:text-lg font-bold text-red-400'
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
			//Validate token
			const token = await authenticate()
			if (token) {
				//Post to db
				postRequest(token, data)
				.then(response => {return response.json() })
				.then(json => {
					if (json.status == 200){
						//Send email
						setMessage({message, success: true, status:true, message:'Se ha realizado la inscripción.'})
						emailRequest(data)
						.then(response => {return response.json()})
						.then(json => {
							console.log(json.message)
						})
					}else if (json.status==400){
						setMessage({message, success: false, status:true, message:'Esta persona ya se encuentra inscripta.'})
					}
					console.log(json.message)
				})
				.catch(error => {
					
				})
			} else{
				setMessage({message, success:false,  status:true, message:'Hubo un error en el registro. Intente más tarde.'})
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
		
			<form onChange={() => {setMessage({message, status:false})}} className=' rounded-md glass card-shadow w-3/4 lg:w-1/2 py-4  lg:py-10  flex flex-col items-center justify-center' onSubmit={ handleSubmit(onSubmit)}>
				<p className='mb-2 lg:mb-6 lg:text-lg text-gray-100  font-bold border-b-4 border-green rounded max-w-max'>Formulario de inscripción</p>
    		<TextInput key={'asd'} value='nombrePostulante' errors={errors.nombrePostulante}  placeholder='Nombre' register={register} required={true}/>
    		<TextInput key={'asd1'} value='apellido' errors={errors.apellido} placeholder='Apellido' register={register}  required={true}/>
    		<TextInput type={'dni'} key={'asd2'} value='dniPostulante' errors={errors.dniPostulante}  placeholder='Documento (DNI)' register={register} required={true}/>
    		<div className='text-center mx-auto pb-3 text-green'>
					<p className='text-gray-100'>Fecha de nacimiento</p>
					<DatePicker onBlur={() =>
						startDate.date.getFullYear() <= new Date().getFullYear() - 17 ?
							setStartDate({...startDate, validated:true})
						: 
							setStartDate({...startDate, validated:false})
						}
						key={'asd3'} dateFormat="dd/MM/yyyy" selected={startDate.date} className={`outline-none border-4 border-transparent focus-border-green input-color text-gray-100 rounded w-52  text-center ${errorBorder}`} locale="es"  onChange={(date) => {setStartDate({...startDate, date:date})}}
					/>
					{startDate.date.getFullYear() > new Date().getFullYear() - 17  ? <p className='text-left pt-1  text-xs text-red-500 font-bold'>* Debe ser mayor de 17 años</p> : ''}
				</div>
				<TextInput type={'email'} key={'asd4'} value='emailPostulante' errors={errors.emailPostulante}  placeholder='Correo electrónico' register={register} required={true}/>
    		<TextInput type={'tel'} key={'asd5'} value='telPostulante' errors={errors.telPostulante}  placeholder='Teléfono / Celular' register={register} required={true}/>
    		<TextInput key={'asd6'} value='empresaPostulante' errors={errors.empresaPostulante} placeholder='Empresa' register={register} required={true} />
				<SelectInput key={'asd7'} options={grupoFamiliarOptions} placeholder='Grupo familiar' value='estadocivil' errors={errors.estadocivil} register={register} required={true} />
				<button disabled = {disabled}  className='tracking-wider bg-gradient-to-t from-green-300 to-blue-500 cursor-pointer text-shadow transition mt-4 hover-bg-green rounded  px-4 py-2 bg-green text-gray-100 font-semibold hover-press-animation hover:shadow-2xl' type="submit">INSCRIBIRSE</button>
				{message.status == true ? <p className={`${messageStyle}`}>{message.message}</p> : ''}
			</form>
		</div>
	)
}