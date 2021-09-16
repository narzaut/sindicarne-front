import React from "react";

export function Header() {
  return (
		<div className='shadow-2xl border-b-8 border-green bg-header-blue py-4 w-full flex items-center justify-center '>
			<img alt='sindicato de la carne' className='w-2/3 md:w-2/4 lg:w-1/5' src={process.env.PUBLIC_URL + '/assets/logo.png'} />
		</div>
  );
}
