import React from 'react'
import { motion } from 'framer-motion'

function Square({value,onClick}) {

  return (
    <motion.button whileTap={{scale:0.9}} className='w-[90px] h-[90px] bg-blue-900 cursor-pointer text-white flex justify-center items-center text-2xl font-bold' onClick={onClick}>
     {value}      
    </motion.button>
  )
}

export default Square
