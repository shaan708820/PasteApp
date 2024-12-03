import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='w-full h-10 flex p-1.5 flex-row gap-4 place-content-evenly bg-blue-900'>
      <NavLink className='text-stone-50 text-lg hover:text-slate-300'
      to='/'
      >
        Home
      </NavLink>

      <NavLink className='text-stone-50 text-lg hover:text-slate-300'
      to='/pastes'
      >
        Pastes
      </NavLink>
    </div>
  )
}

export default NavBar
