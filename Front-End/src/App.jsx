import React, { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const App = () => {
  const [music, setmusic] = useState([])
  const [isRunning, CheckIsRunning] = useState(" ")

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/music');

      setmusic(response.data.musicFiles)

    } catch (error) {
      console.log('error', error)
    }

    // Store the data in state or use it directly
  };

  const handlePlayMusic = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/music/${filename}`, {
        responseType: 'blob' // Set responseType to 'blob' to handle binary data
      });
      const blobUrl = URL.createObjectURL(response.data); // Create a blob URL for the music file
      CheckIsRunning(blobUrl)
      // const audio = new Audio(blobUrl); // Create an HTML Audio element
      // audio.play(); // Start playing the audio
    } catch (error) {
      console.error('Error playing music:', error);
    }
  };

  console.log(music)

  return (
    <div className="bg-[#16132a] min-h-screen bg-treebackground bg-contain bg-no-repeat h-screen bg-center ">
      {music.map((name, index) => (
        <div key={index}>
          <p className='text-yellow-300'>{name}</p>
          <button className='text-yellow-300' onClick={() => handlePlayMusic(name)}>Play</button>

        </div>
      ))}
      <AudioPlayer
        className='fixed bottom-0'
        src={isRunning}
      />
    </div>
  )
}

export default App;
