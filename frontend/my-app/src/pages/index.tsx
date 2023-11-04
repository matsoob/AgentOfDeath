import { Inter } from "next/font/google";
import { WelcomePage } from "./welcomePage";
import { WelcomeBackPage } from "./welcomeBackPage";
import { useEffect, useState } from "react";
import { PersonalMessage } from "./personalWelcomeMessage";

const inter = Inter({ subsets: ["latin"] });

async function firstTimeUser(): Promise<boolean> {
  try {
    const result = await fetch("http://localhost:8000/is-first-time-user");
    const content = await result.json();
    return content;
  } catch (e) {
    console.log(e);
    return true;
  }
}

export default function Home() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [deceasedName, setDeceasedName] = useState("");  

  useEffect(() => {
    // Use `useEffect` for making the API call when the component mounts
    async function fetchData() {
      try {
        const data = await firstTimeUser();
        setIsFirstTimeUser(data);
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
      {isFirstTimeUser ? (
        <WelcomePage setIsFirstTimeUser={setIsFirstTimeUser} setDeceasedName={setDeceasedName} />
      ) : (
        <PersonalMessage deceasedName={deceasedName}/>
      )}
    </main>
  );
}
