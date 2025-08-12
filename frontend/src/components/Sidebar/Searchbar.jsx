import React from 'react'
import { Search } from 'lucide-react';

const Searchbar = () => {
    return <>
    <div className='bg-base-300 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm'>
        <Search className='mr-2' ></Search>
        <input type='text' placeholder='Search' className='w-full bg-transparent placeholder:text-base-content focus:outline-none'>
        </input>
    </div>
    </>
};

export default Searchbar
