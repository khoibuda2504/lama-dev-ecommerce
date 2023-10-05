import React from 'react'
import styles from "./loading.module.css";
import { FadeLoader } from "react-spinners";

export default function loading() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <FadeLoader
        color="#36d7b7"
      />
    </div>
  )
}
