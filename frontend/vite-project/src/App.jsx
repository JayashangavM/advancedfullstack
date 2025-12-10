import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Greeting from './greeting.jsx';
import Home from './home.jsx';
import Counter from './counter.jsx';
import ContinuousSlider from './slider.jsx';

function App() {
  return (
    <div>
      <h1>Hello Vite + React!</h1>  
      <Greeting name="Alice" />
      <Home />
      <Counter />
      <ContinuousSlider />
    </div>
  )
}

export default App