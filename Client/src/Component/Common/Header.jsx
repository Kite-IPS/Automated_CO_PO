import { LogOut } from 'lucide-react'
import React from 'react'
import ThemeToggleButton from '../Buttons/ThemeToggleButton'

const Header = () => {
  return (
    <div className='w-full h-[60px] md:h-[80px] bg-white text-black dark:bg-zinc-800 dark:text-white flex items-center justify-center'>
        <div className='w-[90%] md:w-[80%] flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Automated CO-PO</h1>

            <div className='flex items-center gap-4'>
                <ThemeToggleButton />
                <button className='bg-red-300/50 text-red-500 px-3 py-2 rounded-[8px] cursor-pointer flex items-center gap-2 border-2 border-red-500'>Logout<LogOut /></button>
            </div>
        </div>
    </div>
  )
}

export default Header