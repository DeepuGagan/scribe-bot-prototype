import Sidebar from './Sidebar'
import styles from '@/styles/Layout.module.css'
import { useRouter } from 'next/router';



const Layout = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <div className={pathname !== '/article' ? styles.scribe : ``}>
      <aside className={styles.sidebar}>
        <Sidebar></Sidebar>
      </aside>
      <section className={styles.chatbox}>



        {/* <StageInputWidget
          inputData={"generate an headline about  queen of england death?"}
          apiCall={ArticleApiCall}
        />

        <StageInputWidget
          inputData={"generate an article of 100 words about queen of england death"}
          apiCall={ArticleApiCall}
        />

        <StageInputWidget
          inputData={"a cute dog"}
          inputType={'imageUrls'}
          apiCall={generateImageUrls}
        /> */}

        {children}
      </section>
    </div>
  )
}

export default Layout
