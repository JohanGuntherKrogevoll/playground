import { FormEvent, useState } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function AzureBlobStorage() {
    const [fileName, setFileName] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    async function postForm(event: FormEvent) {
        event.preventDefault()
        try {
            const res = await fetch(
                `/api/azure-blob-storage?fileName=${fileName}&content=${content}`,
                { method: "POST" }
            );
            if (res.ok) {
                setMessage("File successfully created in Azure Blob Storage")
            }
        } catch (err) {
            setMessage("There was an error when creating the file in Azure Blob Storage")
        }
    }

    return (
        <>
            <Head>
                <title>Azure Blob Storage</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <form onSubmit={postForm} method="post">
                    <label htmlFor="fileName">File name:</label>
                    <input
                        type="text"
                        id="fileName"
                        name="fileName"
                        required
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />
                    <label htmlFor="content">Content:</label>
                    <input
                        type="text"
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                    <p>{message}</p>
                </form>
            </main>
        </>
    );
}
