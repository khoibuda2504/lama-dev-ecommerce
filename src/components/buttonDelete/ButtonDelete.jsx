"use client"
import React from 'react'
import styles from './button.module.css'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const ButtonDelete = ({ slug, createdEmail }) => {
  const router = useRouter()
  const { data: userData } = useSession();
  const handleDeletePost = async () => {
    try {
      await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      });
      toast.success('You have deleted post successfully')
      router.push('/')
    } catch (error) {
      toast.error('Something wrong! Try again later')
    }
  }
  if (createdEmail === userData?.user?.email) return <button className={styles.btn} onClick={handleDeletePost}>Delete Post</button>
  return null
}

export default ButtonDelete