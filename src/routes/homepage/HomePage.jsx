import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import orbital from './orbital.png'
import bot from './bot.png'
import human1 from './human1.jpeg'
import human2 from './human2.jpeg'
import './HomePage.css'
import { TypeAnimation } from 'react-type-animation'

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState('')
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
          <div className='chat'>
            <img
              src={
                typingStatus === 'human1'
                  ? human1
                  : typingStatus === 'human2'
                  ? human2
                  : bot
              }
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                ' Human1: We produce food for Mice',
                1000,
                () => {
                  setTypingStatus('human1')
                },
                'Bot: We produce food for Hamsters',
                1000,
                () => {
                  setTypingStatus('bot')
                },
                'Human2: We produce food for Guinea Pigs',
                1000,
                () => {
                  setTypingStatus('human2')
                },
              ]}
              wrapper='span'
              speed={100}
              style={{ fontSize: '2em', display: 'inline-block' }}
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
