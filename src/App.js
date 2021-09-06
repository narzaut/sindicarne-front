import React from "react";
import { Header } from './components/Header'
import { InscriptionForm } from "./components/InscriptionForm";

export const App = () => {
  return (
		<div className='bg-app-blue bg-fixed h-screen flex flex-col items-center'>
			<Header />
			<InscriptionForm />
		</div>   
  );
}