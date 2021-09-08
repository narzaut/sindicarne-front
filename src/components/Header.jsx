import React from "react";

export function Header() {
  return (
		<div className='bg-header-blue py-4 w-full flex items-center justify-center '>
			<img className='w-2/3 md:w-2/4 lg:w-1/5' src={process.env.PUBLIC_URL + '/assets/logo.png'} />
		</div>
    
  );
}
