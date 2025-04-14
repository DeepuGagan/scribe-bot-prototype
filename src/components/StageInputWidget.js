import { useEffect, useState } from 'react'
import { CheckIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Loader from './Loader'
import TextareaAutosize from 'react-textarea-autosize';
import styles from '@/styles/StageInputWidget.module.css'
import headline from '@/pages/headline';

const makeRequest = ({ setState, state, state: { inputText }, props, sectionType, setSection }) => () => {
  if (inputText) {
    setState((prevState) => ({ ...prevState, reqStatus: true }))
    props.apiCall({ inputText }).then(d => {
      if (props.inputType === 'imageUrls') {
        const { data = [] } = d
        const urls = data.map(({ url }) => url)
        setState((prevState) => ({ ...prevState, imageUrls: urls, reqStatus: false }))
        setSection((prevState) => ({ ...prevState, imgUrl: urls }))
        return
      } 
      else {
        const { data: { openAiResponses: { text } = {} } = {} } = d
        setState((prevState) => ({ ...prevState, output: text, reqStatus: false }))
        if(sectionType == 'headline') { setSection((prevState) => ({ ...prevState, headline: text })) }
        else if(sectionType=='seoAndMeta') {
          setSection((prevState) => ({ ...prevState, seoAndMeta: text }))
        }
        else { setSection((prevState) => ({ ...prevState, article: text }))}
      }
    }).catch(e => {
      console.error(e)
    })
    // debugger
  }
}

export default function StageInputWidget(props = {}) {
  console.log("props", props)
  const { inputData = '', inputType = 'textarea', sectionType, setSection } = props
  const [state, setState] = useState({ inputText: '', output: '', reqStatus: false, imageUrls: [], done: false })
  const { output = '', inputText = '',imageUrls = [] } = state

  const makeRequestHandler = makeRequest({ setState, state, props, sectionType, setSection })

  useEffect(()=>{
    if(props.inputData) {
      setState(prevState=>({...prevState, inputText: props.inputData}))
    }
  }, [props.inputData])

  useEffect(() => {
    if (inputText) {
      setState((prevState) => ({ ...prevState, reqStatus: true }))
      makeRequestHandler()
    }
  }, [inputText])

  return (
    <div className='grid grid-cols-1 w-full grid-flow-row '>
      {inputText && <>  <div className='row-span-6  bg-white text-black'>
        <div className='flex flex-col '>
          <input type="text" className={`${styles.inputTitle} text-black bg-gray`} disabled placeholder='input text will show up here' value={inputText} />
          {output && !state.reqStatus &&  ( inputType === 'textarea' ? <TextareaAutosize className='bg-white ' value={output} readOnly /> :  <input className='bg-white ' onChange = {(e) => setHeadline(e.target.value)} value = {output}></input> ) }
          {imageUrls.length > 0 && !state.reqStatus && (<div className='flex flex-row'>{imageUrls.map(url => (<img className={styles.imageRenderStyle} key={url} alt='scribe-icon' loading='lazy' src={`${url}`} width={300} height={400} />))}</div>)}
          {state.reqStatus && <Loader />}
          {/* {imageUrls.length<0 && <Loader />} can be used for image loaders */}
        </div>
      </div>
       { !state.done && <div className='row-span-3 flex justify-end items-center '>
          <CheckIcon className="h-6 w-20 text-gray-500 mr-4 bg-blue-100 hover:bg-sky-200" onClick={(e) => {
            console.log("check clicked")
            !state.reqStatus && setState((prevState)=> ({...prevState, done:true}))
            props.enableNextStage()
          }} />
          <ArrowPathIcon className="h-6 w-20 text-black-500 bg-red-100 hover:bg-red-200" onClick={(e) => {
            console.log("resend called")
            makeRequestHandler()
          }} />
        </div>}
      </>}
    </div>
  )
}
