import { Inter } from "next/font/google";
import { useEffect, useState } from "react"; // Import `useEffect` and `useState` from 'react'

const inter = Inter({ subsets: ["latin"] });

async function exampleFetch() {
  try {
    const result = await fetch("http://localhost:8000/notes");
    console.log("FETCH: ", result);
    return result.json();
  } catch (e) {
    console.log(e);
    return "testtest";
  }
}

export default function Home() {
  const [quotes, setQuotes] = useState(null); // Use `useState` to manage the quotes state

  useEffect(() => {
    // Use `useEffect` for making the API call when the component mounts
    async function fetchData() {
      try {
        const data = await exampleFetch();
        console.log(data);
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <span>From backend: {quotes !== null ? quotes : "Loading..."}</span>
      </div>
    </main>
  );
}
