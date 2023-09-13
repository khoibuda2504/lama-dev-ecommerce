import React from 'react'
import styles from './menuPosts.module.css'
import Link from 'next/link'
import Image from 'next/image'
const MenuPosts = ({ withImage = true }) => {
  return (
    <div className={styles.items}>
      <Link href="/" className={styles.item}>
        {withImage &&
          <div className={styles.imageContainer}>
            <Image src='/p1.jpeg' alt='' fill className={styles.image} />
          </div>
        }
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.travel}`}>Travel</span>
          <h3 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}>10.03.2023</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MenuPosts