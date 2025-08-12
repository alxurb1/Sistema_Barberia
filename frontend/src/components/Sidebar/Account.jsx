import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
const Account = () => {
  return (
    <div className='border-b mb-4 mt-2 pb-4 border-stone-300'>
      <button className='flex p-0.5 hover:bg-base-300 rounded transition-colors relative gap-2 w-full items-center'>
        <img src='https://img.freepik.com/premium-vector/cartoon-illustration-barber-with-red-striped-pole-him_1294240-35554.jpg?w=900' alt='avatar' className='size-8 rounded shrink-0 bg-violet-500 shadow'/>
        <div className='text-start'>
          <span className='text-sm font-bold block'>
            Barber Admin 
          </span>
          <span className='text-xs block text-base-500'>
            admin@barber.sv
          </span>
        </div>
        <ChevronDown className='absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs pt-1'/>
        <ChevronUp className='absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs pb-1'/>
      </button>
    </div>
  )
}

export default Account
