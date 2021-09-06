import React from "react";

export function Header() {
  return (
		<div className=' py-4  w-full flex items-center justify-center '>
			<img className='w-3/4 md:w-2/4 lg:w-1/5' src={process.env.PUBLIC_URL + '/assets/logo.png'} />
		</div>
    
  );
}
