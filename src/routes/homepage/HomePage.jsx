import React from 'react'
import { Link } from 'react-router-dom'
import orbital from './orbital.png'
import bot from './bot.png'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className='homepage'>
      <img src={orbital} className='orbital' />
      <div className='left'>
        <h1>GPT Clone</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat hic
          veniam facere maiores aperiam quos repellendus, nostrum magnam.
          Temporibus, maxime?
        </h3>
        <Link to='/dashboard'>Get Started </Link>
      </div>
      <div className='right'>
        <div className='imgcontainer'>
          <div className='bgcontainer'>
            <div className='bg'></div>
          </div>
          <img src={bot} className='bot' />
        </div>
      </div>
    </div>
  )
}

export default HomePage
