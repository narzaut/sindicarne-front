import React from "react";

export const SubmitMessage = ( { message }) => {
	return (
		<div className='px-2 flex items-center justify-center'>
					{message.status == true && message.success == true ? 
						<div>
							<div className='flex items-center justify-center'>
								<i class="text-shadow-sm text-lg pr-2 fas fa-user-check text-green-300 text-shadow-sm"></i> 
								<p className={`text-green-400 text-shadow-sm tracking-wide lg:text-lg font-bold py-4`}>{message.message}</p> 
							</div>
							<div className='flex items-center justify-center'>
								<i class="text-shadow-sm text-xl pr-2 fas fa-comment-dots text-green-300 text-shadow"></i> 
								<p className={`text-sm text-green-400 text-shadow-sm tracking-wide lg:text-lg font-bold py-4`}>A la brevedad nos contactaremos</p> 
							</div>
						</div>
					: message.status == true && message.success == false ? 
						<div className='flex items-center justify-center'>
							<i class="text-shadow-sm text-lg text-red-500 pr-2 fas fa-exclamation-circle"></i> 
							<p className={`text-red-400 text-shadow-sm tracking-wide  lg:text-lg font-bold py-4`}>{message.message}</p> 
						</div>
					: 
						''
					}
				</div>
	)
}