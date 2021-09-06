import React from "react";
import { useForm } from "react-hook-form";
import { Header } from './components/Header'
export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
   
  return (
		<div className='bg-blue bg-fixed h-screen flex flex-col items-center'>
			<Header />

			<div className='flex flex-col bg-red-400 w-full mx-10 mt-20'>
				<form className='p-4 bg-blue-700 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      		<input {...register("firstName")} />
      		<select {...register("gender")}>
      		  <option value="female">female</option>
      		  <option value="male">male</option>
      		  <option value="other">other</option>
      		</select>
      		<input type="submit" />
    		</form>
			</div>
		</div>
    
  );
}

/*<form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
	*/