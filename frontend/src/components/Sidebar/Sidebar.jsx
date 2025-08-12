import React from 'react'
import Account from "./Account"
import Searchbar from './searchbar'
import RouteSelector from './RouteSelector'

const Sidebar = () => {
  return (
    <div>
      <div className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]'>
        <Account/>
        <Searchbar/>
        <RouteSelector/>
      </div>
    </div>
  )
}

export default Sidebar
