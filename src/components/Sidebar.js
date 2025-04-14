import Link from 'next/link'
import { useRouter } from "next/router";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { SidebarLinks } from './SidebarLinks'
import styles from '@/styles/Sidebar.module.css'

const inter = Inter({ subsets: ['latin'] })

 const Sidebar = () => {

  const router = useRouter();

  return (
    <>
    <div className={styles.sideTitle}> Scribe: The AI-Powered Article Generator </div>
    <div className={styles.sidebox}>
      <div className={styles.logobar}>
        <Image alt='scribe-icon' src='/scribe.png' width={120} height={200}></Image>
        <span>  </span>
      </div>
      <div className={styles.typewriter}>
        <h1> Hi, Scribe is here to help you </h1>
      </div>
      {/* <div className={styles.navlist}>
        <ul>
          {SidebarLinks.map(({title, link}) => (
            <Link key={`link-${title}`} href={link} className={router.pathname == link ? styles.active : ""}>
              <li key={`li-${title}`} className={styles.row} > {title} </li>
            </Link>
          ))}
        </ul>
      </div> */}
    </div>
    <div className={styles.footer}>
      <div>Scribe Squad:</div>
      <div>Gagandeep V</div>
    </div>
    </>
  )
}

export default Sidebar
