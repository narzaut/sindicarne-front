import React from "react";
import { Header } from './components/Header'
import { InscriptionForm } from "./components/InscriptionForm";

export const App = () => {
  return (
		<div className='h-screen overflow-scroll bg-app-blue flex flex-col items-center'>
			<Header />
			<InscriptionForm />
		</div>   
  );
}