import React from 'react'
import styles from './featured.module.css'
import Image from 'next/image'
import Link from 'next/link';
const getData = async (page,cat) => {
  const res = await fetch(`http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
const Featured = async () => {
  const { posts } = await getData(2)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Khoi here!</b> Discover my stories and creative ideas.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src={posts?.[0]?.img} alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>{posts?.[0]?.title}</h1>
          <p className={styles.postDesc}>
          {posts?.[0]?.desc}
          </p>
          <button className={styles.button}>
            <Link href={`posts/${posts?.[0]?.slug}`}>
            Read More
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Featured