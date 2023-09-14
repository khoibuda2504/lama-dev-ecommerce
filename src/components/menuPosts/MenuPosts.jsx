import React from 'react'
import styles from './menuPosts.module.css'
import Link from 'next/link'
import Image from 'next/image'

const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts?popular=${true}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuPosts = async () => {
  const { post } = await getData()
  return (
    <div className={styles.items}>
      <Link href="/" className={styles.item}>
        <div className={styles.imageContainer}>
          <Image priority src={post.img} alt='' fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.travel}`}>{post.catSlug}</span>
          <h3 className={styles.postTitle}>
            {post.title}
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>{post.user.name} </span>
            <span className={styles.date}>{post.createdAt.substring(0, 10)}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MenuPosts