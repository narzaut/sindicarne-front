import React from "react";
import { Header } from './components/Header'
import { InscriptionForm } from "./components/InscriptionForm";
import { Footer } from './components/Footer'
export const App = () => {
  return (
		<div className='text-shadow titillium-font  h-screen overflow-scroll overflow-x-hidden bg-app-blue flex flex-col items-center'>
			<Header />
			<InscriptionForm />
			<Footer />
		</div>   
  );
}