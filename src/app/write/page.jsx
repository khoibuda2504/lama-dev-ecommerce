"use client";

import Image from "next/image";
import styles from "./write.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import dynamic from "next/dynamic";

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

  const [fileInput, setFileInput] = useState(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [previewImg, setPreview] = useState('')
  useEffect(() => {
    if (fileInput?.files && fileInput?.files?.[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(fileInput?.files?.[0]);
    }
  }, [fileInput]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }



  const handleSubmit = async () => {
    const fetcher = async (downloadUrl = null) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc: value,
          img: downloadUrl,
          slug: slugify(title),
          catSlug: catSlug || "style"
        }),
      })
      if (!res.ok) return
      const data = await res.json()
      router.push(`/posts/${data.id}`);
    }
    if (!fileInput) {
      fetcher()
      return
    }
    const file = fileInput?.files?.[0]
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => { },
      () => { },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        fetcher(downloadUrl)
      })
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.options}>
          <div className="d-flex align-center">
            <span className="mr-2">Select category:</span>
            <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
              <option value="style">style</option>
              <option value="fashion">fashion</option>
              <option value="food">food</option>
              <option value="culture">culture</option>
              <option value="travel">travel</option>
              <option value="coding">coding</option>
            </select>
          </div>
          {!previewImg &&
            <div className="d-flex align-center">
              <span className="mr-2">Add image:</span>
              <div className={styles.add}>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setFileInput(e.target)}
                  style={{ display: "none" }}
                />
                <button className={styles.addButton}>
                  <label htmlFor="image">
                    <Image src="/image.png" alt="image" width={16} height={16} />
                  </label>
                </button>
              </div>
            </div>
          }
        </div>
        <button className={styles.publish} onClick={handleSubmit}>
          Publish
        </button>
      </div>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.editor}>
        {previewImg &&
          <div className={styles.preview}>
            <div className={styles.previewImg}>
              <Image src={previewImg} fill alt="preview" />
            </div>
            <div className={styles.previewBtn} onClick={() => setPreview('')}>
              X
            </div>
          </div>
        }
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
    </div>
  );
};

export default WritePage;