import { useEffect, useState } from "react";
import { SubscriptionManager } from "./addSubscription";

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

export function WelcomeBackPage() {
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
    <div>
      <span>Let us pick up where we left off...</span>
      <SubscriptionManager />
    </div>
  );
}
