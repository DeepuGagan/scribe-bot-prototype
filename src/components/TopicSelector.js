
import { Inter } from 'next/font/google'
import React, { useState, useEffect } from 'react';
const inter = Inter({ subsets: ['latin'] })
import styles from '@/styles/TopicSelector.module.css'
import axios from "axios";


const TagGenerator = ({ trends = [], setSection, enableNextStage }) => (
  <div className={styles.tagsContainer}>
    {trends.length ? trends.map((topic) => (
      <span key={`trend-${topic}`} className={styles.tags} onClick={() => {
        setSection((prevState) => ({ ...prevState, topic }))
        enableNextStage()
      }}>
        {topic}
      </span>
    )) : null}
  </div>
)

const TopicSelector = ({ setSection, enableNextStage }) => {

  const [trends, setTrends] = useState([])

  const handleInputChange = (e) => {
    setSection((prevState) => ({ ...prevState, topic: e.target.value }))
  }

  const resetTopic = (e) => {
    setSection((prevState) => ({ ...prevState, topic: ''}))
  }

  useEffect(() => {
    axios.get('/api/trends/IN').then((response) => {
      setTrends(response.data);
    }).catch((err) => {
      console.error(err);
      setTrends(['trend1', 'trend2', 'so on..', 'need to use openai api key to make this app work'])
    })
  }, [])

  return (
    <div className={styles.topicSelector}>
      <span className='trending-text'><b>Choose from today's trending topics</b> </span>
      <div className='tags-box'>
        {TagGenerator({ trends, setSection, enableNextStage })}
      </div>
      {/* <span> or command scribe to write on the topic you wish: </span> */}
      {/* <input type='text' onChange={handleInputChange} /> */}
      {/* <button className={styles.resetTopic} onClick={resetTopic}> Reset Topic</button> */}
    </div>
  )
}

export default TopicSelector
