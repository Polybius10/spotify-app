import React from 'react'
import {useState} from 'react';
import Card from './Components/Card.jsx'
// import useFetch from './UseFetch.jsx'
import './sass/App.scss';



export default function App() {
  const [song, setSong] = useState('');
  const [songs, setSongs] = useState([]);
  // const {data, loading, error} = useFetch(`https://spotify23.p.rapidapi.com/search/?q=${song}&type=multi&offset=0&limit=10&numberOfTopResults=5`);
  const url = `https://spotify23.p.rapidapi.com/search/?q=${song}&type=multi&offset=0&limit=10&numberOfTopResults=5`
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8e9b8cf4a5msh8f32dae1444991ap1ea05cjsn893f5bc90220',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };


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


  async function getSong (song) {
    try {
        let data = await fetch (url, options);
        let result = await data.json();
        setSongs(result.tracks.items)
        console.log(result.tracks.items)
    } catch (error) {
      console.log(`Error: ${error}`)
    }
    console.log(song)
  }

  // const milliseconds = song.data.duration.totalMilliseconds;
  // function convertMs(milliseconds){
  //   const minutes = Math.floor(milliseconds / 60000);
  //   const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  // }

  return (
    <div>
      <h1 className='title'>Spotify App</h1>
      <form onSubmit={handleSearch} className='search-section'>
        <button type="submit" className='submit-button'>
          <img className='submit-icon' src="/icons/magnifying-glass-icon.svg"/>
          </button>
        <input type="text" value={song} placeholder='What do you want to listen to?' className='search-input' onChange={e => setSong(e.target.value)}/>
      </form>
      <article className='main-section'>
      {songs?.map((song,index) => (
        <>
          <Card key={index}
          album={song.data.albumOfTrack.coverArt.sources[0].url}
          title={song.data.name}
          artist={song.data.artists.items[0].profile.name}
          duration={song.data.duration.totalMilliseconds}
          link={song.data.uri}
          >
            {/* <a href={song.data.uri}><button>Play</button></a> */}
          </Card>
        </>
      ))
      }
      </article>
      <p>Version: 1.0</p>
    </div>
  )
}