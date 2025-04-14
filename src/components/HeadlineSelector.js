
import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import axios from 'axios';
import styles from '@/styles/HeadlineSelector.module.css'
import StageInputWidget from './StageInputWidget'
const inter = Inter({ subsets: ['latin'] })

 const HeadlineSelector = ({ setSection, sections }) => {
  console.log(sections);
  const setArticleHeadline = ({inputText}) => {
    if (inputText) {
      return axios.post("http://localhost:3000/api/open-ai", {
        inputText
      })
    }
  }


  return (
    <>
    { sections.topic && <div className={styles.headlineSection}><StageInputWidget
          inputData={`generate a headline for ${sections.topic}`}
          inputType = 'text'
          apiCall = {setArticleHeadline}
      /></div>}
      </>
  )
}

export default HeadlineSelector
