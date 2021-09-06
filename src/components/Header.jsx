import React from "react";

export function Header() {
  return (
		<div className='px-20 py-4 shadow-2xl w-full flex items-center justify-center '>
			<img className='h-20' src={process.env.PUBLIC_URL + '/assets/logo.png'} />
		</div>
    
  );
}
