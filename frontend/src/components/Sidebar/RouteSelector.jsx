import React from 'react'
import PropTypes from 'prop-types';
import { Scissors,Users,Calendar } from "lucide-react";


const RouteSelector = () => {
  return (
    <div className='space-y-5'>
        <Route Icon={Scissors} selected={true} title={"Cortes"}/>
        <Route Icon={Users} selected={true} title={"Usuarios"}/>
        <Route Icon={Calendar} selected={true} title={"Citas"}/>
    </div>
  )
}
const Route = ({selected,Icon,title}) =>{
    return <button className={`flex items-center space-x-2 ${selected ? 'text-blue-500' : 'text-gray-400'}`}>
        <Icon className=''></Icon>
        <span>{title}</span>
    </button>;
};
Route.PropTypes ={
    selected:PropTypes.bool.isRequired,
    Icon: PropTypes.elementType.isRequired,
    title:PropTypes.string.isRequired,
};

export default RouteSelector
