import React from 'react'
import {useState} from 'react';
// import {UseFetch} from './UseFetch.jsx'
import './App.scss';


export default function App() {
  const [song, setSong] = useState('');
  const [songs, setSongs] = useState([]);
  // const BASEUrl = 'https://api.spotify.com.'

  function handleSearch (e) {
    e.preventDefault();

    if (song.trim()=== '') {
      alert('Debes ingresar algo...')
      return
    }
    console.log(song)
    setSong('')
    getSong(song)
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8e9b8cf4a5msh8f32dae1444991ap1ea05cjsn893f5bc90220',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  async function getSong (song) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${song}&type=multi&offset=0&limit=10&numberOfTopResults=5`
        let data = await fetch (url, options);
        let result = await data.json();
        setSongs(result.tracks.items)
    } catch (error) {
      console.log(`Error: ${error}`)
    }
    console.log(song)
  }



  return (
    <div>
      <h1>Spotify App</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={song} onChange={e => setSong(e.target.value)}/>
        <button type="submit">Search</button>
      </form>
      {songs.map((song,index) => (
        <>
          <div key={index} className='card'>
            <h2>{song.data.name}</h2>
            <img src={song.data.albumOfTrack.coverArt.sources[0].url} width={150} height={150}/>
            <a href={song.data.uri}><button>Play Song</button></a>
          </div>
        </>
      ))}
      <p>Version: 1.0</p>
    </div>
  )
}