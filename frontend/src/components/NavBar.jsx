import React from 'react';
import { Link, useResolvedPath } from 'react-router-dom';
import { Scissors,Users,Calendar } from "lucide-react";
import ThemeSelector from './ThemeSelector';

function NavBar() {
  const {pathname}= useResolvedPath();
  const isHomePage = pathname === "/";
  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO*/ }
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <Scissors className="size-9 text-primary"/>
                <span className="font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  BARBERSHOP
                </span>
              </div>
            </Link>
          </div>
          {/*SECCION DERECHA*/}
          <div className="flex items-center gap-4">
            <ThemeSelector/>
            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <Scissors className='size-5'/>
                  <span className="badge badge-sm badge-primary indicator-item">8</span>
                </div>
              </div>
            )}
            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <Users className='size-5'/>
                  <span className="badge badge-sm badge-primary indicator-item">8</span>
                </div>
              </div>
            )}
            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <Calendar className='size-5'/>
                  <span className="badge badge-sm badge-primary indicator-item">8</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
