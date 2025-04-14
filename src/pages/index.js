
import { Inter } from 'next/font/google'
import TopicSelector from '../components/TopicSelector'
import React, { useState } from 'react';
import GetArticleBtn from '../components/GetArticleBtn';
import StageInputWidget from '../components/StageInputWidget'
import styles from '@/styles/Stepper.module.css'

import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

const ArticleApiCall = ({ inputText }) => {
  if (inputText) {
    return axios.post("http://localhost:3000/api/open-ai", {
      inputText
    }).catch(console.error())
  }
}

const generateImageUrls = ({ inputText }) => {
  if (inputText) {
    return axios.post("http://localhost:3000/api/images", {
      inputText,
    }).catch(console.error())
  }
}

const Home = () => {
  const [sections, setSection] = useState({ topic: "", headline: "", article: "", imgUrl: [], seoAndMeta: "" })
  const [statusState, setStatus] = useState({ status: { 1: true } })

  const steps = [
    {
      name: 'Step 1',
      // id: 1,
      Component: TopicSelector ,
      inputData: sections,
      setSection: setSection,
    },
    {
      name: 'Step 2',
      // id: 2,
      inputType: 'text',
      apiCall: ArticleApiCall,
      inputData: `Generate a headline about  ${sections.topic}`,
      sectionType: 'headline',
      setSection: setSection,
      heading: ' Headline'
    },
    {
      name: 'Step 3',
      // id: 3,
      inputType: 'textarea',
      apiCall: ArticleApiCall,
      inputData: `Generate an article of 100 words about ${sections.headline}`,
      sectionType: 'article',
      setSection: setSection,
      heading: ' Content'
    },
    {
      name: 'Step 4',
      // id: 4,
      inputType: 'imageUrls',
      apiCall: generateImageUrls,
      inputData: `Digital photos representing ${sections.topic} `,
      sectionType: 'imgUrl',
      setSection: setSection,
      heading: ' Images'
    },
    {
      name: 'Step 5',
      // id: 5,
      inputType: 'textarea',
      apiCall: ArticleApiCall,
      inputData: `Generate HTML SEO and Meta-Tags for the headline - ${sections.headline}`,
      sectionType: 'seoAndMeta',
      setSection: setSection,
      heading: ' SEO'
    },
    {
      name: 'Step 6',
      // id: 5,
      inputType: 'json',
      apiCall: '',
      inputData: sections,
      sectionType: 'generate button',
      Component: GetArticleBtn,
      setSection: setSection,
      heading: ' an Article'
    }
  ].map((item, index) => ({ ...item, id: index + 1 }))
  .filter(({id})=> statusState.status[id])
  console.log({steps})
  console.log({sections})
  const [activeStepper, setActiveStepper] = useState(steps.reduce((acc, { id }) => ({ ...acc, [id]: false }), {}));

  return (
    <div className='mainPage'>
      {/* <span className='curState'> Current State: {JSON.stringify(sections)}</span> */}
      {/* <TopicSelector setSection={setSection}  /> */}
      {/* <HeadlineSelector setSection={setSection} sections={sections}/> */}
      <div className={`${styles.wrapper}`}>
        {
          ...steps.map(step => {
            const { name, id, inputType, apiCall, Component = StageInputWidget, inputData = '', sectionType, setSection, heading = '' } = step
            console.log(statusState.status[id], id );
            return <div key={name} className={`${styles.steppers} ${activeStepper[id] ? styles['steppers-active'] : ''}`} >
              <div>
                <div className={`${styles.circle}`}>{activeStepper[id] ? <span>▼</span> :<span>▶</span> }</div>
              </div>
              <div>
                <div className={`${styles.title}`}>{activeStepper[id] ? 'Created' :'Create' } {heading}</div>
                <div className={`${styles.textField}`}>
                  <Component
                    // key={name}
                    inputData={inputData}
                    apiCall={apiCall}
                    inputType={inputType}
                    sectionType={sectionType}
                    setSection={setSection}
                    enableNextStage={() => {
                      setStatus(prevState => ({ ...prevState, status: { ...prevState.status, [id + 1]: true } })),
                      setActiveStepper(prevStatus => ({ ...prevStatus, [id]: !prevStatus[id] }))
                    }}
                  />
                </div>
              </div>

            </div>
          })
        }
        </div>
    </div>
  )
}

export default Home
