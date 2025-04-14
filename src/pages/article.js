
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import styles from '@/styles/article.module.css'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

 const article = () => {
  const [articleSections, setSections] = useState({})

  const getArticle = ({headline, article, imgUrl = []}) => (
    <div className={styles.articleWrapper}>
      <h3 className={`headline ${styles.previewHeadline}`}>{headline && headline.replaceAll('"', '')}</h3>
      <div className={styles.detailWrapper}>
      <div className={styles.articleDetails}>
      <p className={styles.description}>{article && article.slice(0,200)}...</p>
      <div className={styles.author}>By Scribe: {(new Date()).toString().split(' ').splice(1,3).join(' ').toString()}</div>
      <div className={styles.primaryMediaWrapper}>
      <img className={`${styles.previewImage} ${styles.primaryMedia}`} src={imgUrl[0]} alt='primary1' width={500} height={300}/>
      <span className={styles.imageCredit}>Credit: Scribe</span>
      </div>
      <div className={styles.mainContentWrapper}>
      <p className={`content ${styles.previewContent}`}>{article && article}</p>
      </div>
      <img className={styles.previewImage} src={imgUrl[1]} alt='secondary2' width={300} height={200} />
      </div>
      <div className={styles.adImageWrapper}>
      <Image className={styles.adImage} alt='scribe-icon' src='/amazon-ad.jpeg' width={450} height={500}></Image>
      <Image className={styles.adImage} alt='scribe-icon' src='/1234.jpeg' width={450} height={500}></Image>
      </div>
      </div>
    </div>
  )

  useEffect(() => {
    try {
      const storedArticle = JSON.parse(localStorage.getItem('finalArticle'))
      setSections(storedArticle)
    } catch(err) {
      console.error(err)
    }

  }, [])

  return (
    <div className=''>
      {getArticle(articleSections)}
    </div>
  )
}

export default article
