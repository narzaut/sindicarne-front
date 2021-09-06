import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "./FormInput"
import { SelectInput } from "./SelectInput"
export const InscriptionForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const onSubmit = data => console.log(data);
	const grupoFamiliarOptions = [
		{
			option:'Con grupo familiar',
			value: true
		},
		{
			option:'Sin grupo familiar',
			value: false
		}
	]
	return (
		<div className='flex flex-col  w-full m-10'>
			<form className='p-4  flex flex-col items-center justify-center' onSubmit={handleSubmit(onSubmit)}>
    		<TextInput value='nombre' errors={errors.nombre}  placeholder='Nombre' register={register} required={true}/>
    		<TextInput value='apellido' errors={errors.apellido} placeholder='Apellido' register={register}  required={true}/>
    		<TextInput value='dni' errors={errors.dni}  placeholder='Documento (DNI)' register={register} required={true}/>
    		<TextInput value='mail' errors={errors.mail}  placeholder='Correo electrónico' register={register} required={true}/>
    		<TextInput value='telefono' errors={errors.telefono}  placeholder='Telefono / Celular' register={register} required={true}/>
    		<SelectInput options={grupoFamiliarOptions} placeholder='Grupo familiar' value='grupoFamiliar' errors={errors.grupoFamiliar} register={register} required={true} />
				
				<input type="submit" />
    	</form>
		</div>
	)
}

/*

idPostulante
nombrePostulante	****
dniPostulante	****
fechaIngresoPostulante
fechaNacimientoPostulante	****
grupoFamiliarPostulante	****
empresaPostulante	****
activoPostulante
fechaCargaPostulante
telefonoPostulante	****
mailPostulante	****
*/

/*


				
				
				<div className='flex py-2'>
					<p>Empresa:</p>
					<select {...register("gender")}>
    		  	<option value="female">female</option>
    		  	<option value="male">male</option>
    		  	<option value="other">other</option>
    			</select>
				</div>

				*/