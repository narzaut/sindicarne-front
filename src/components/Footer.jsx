import React from "react";

export function Footer() {
  return (
		<div className='text-shadow border-t-4 border-green divide-y-2 text-center gap-4  lg:text-lg bg-header-blue py-4 w-full flex flex-col text-gray-300 font-medium items-center justify-center '>	
			<div className='gap-4 '>
				<p>Sindicato de la Carne Río Cuarto</p>
				<p>Lavalle 992, Esq. Bolivar - Río Cuarto - Córdoba</p>
				<p>0358-4649-942</p>
				<p>sin.dela.carnerioiv@hotmail.com</p>
				<a className='font-bold' href="https://sindicarne.com.ar/politica_privacidad">Leer politica de privacidad de nuestra app </a>
			</div>
			<div className='py-2  w-2/3 lg:w-1/3 border-0 border-green'>
				<p className='w-full'>Desarrollado por <a href="https://www.itecriocuarto.org.ar/" className='font-bold '><span className='text-red-400'>i</span><span className='text-blue-400'>T</span><span className='text-yellow-400'>e</span><span className='text-green-400'>c</span> LABs</a></p>
			</div>
		</div>
  );
}
