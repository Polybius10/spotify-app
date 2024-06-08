import React from 'react'

export default function Card ({album="abc", title="title", artist="artist", duration='3:20', link="abc"}) {
    return (
      <div className='card'>
        <img src={album} className='album'/>
        <section className="song-data">
          <h3 className="title-song">{title}</h3>
          <p className='artist'>{artist}</p>
        </section>
        <section className="play">
          <a href={link} className='play-redirect'><button className='play-button'>PLAY</button></a>
          <span className='duration'>{duration}</span>
        </section>
      </div>
    )
  }

