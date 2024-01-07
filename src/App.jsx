import { useState, useEffect, useMemo } from 'react'
import React from 'react'
import './App.css'
import { Result } from './Result'

const synth  = window.speechSynthesis;
function App () {
  const voices = useMemo(()=> synth.getVoices(), [])
  const [voiceSelected, setVoiceSelected] = useState("Google US English")
const [text, setText] = useState("")
const [isSpeaking, setIsSpeaking] = useState("")

const startSpeech = (text) => {
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = voices.find(voice => voice.name === voiceSelected)
console.log(voiceSelected)
  synth.speak(utterance)
}
const handleSpeech = () => {
  if(!text.trim()) return;
  if(!synth.speaking){
    startSpeech(text)
    setIsSpeaking("speak")
  } else {
    synth.cancel()
  } 
  setInterval(()=> {
    if(!synth.speaking){
      setIsSpeaking("")
    }
  },100)
  startSpeech(text)
}
  return (
    <div className='container'>
      <h1>English Dictionary</h1>
      <form>
        <div className='row'>
          <textarea name="" id="" cols="30" 
          rows="4" placeholder='Enter Text'
          value={text} onChange={e => setText(e.target.value)}></textarea>

          <div className="voices-icons">
            <div className="select-voices">
            <select value={voiceSelected} onChange={e => setVoiceSelected(e.target.value)}>
                
                  {voices.map((voice, index) => (
                    <option key={index} value={voice.name}>{voice.name}</option>
                  ))}
                </select>
            </div>
          </div>

          <i className={`fa-solid fa-volume-high ${isSpeaking}`}
          onClick={handleSpeech}></i>
        </div>
      </form>
      <Result />
    </div>
  )
}

export default App
