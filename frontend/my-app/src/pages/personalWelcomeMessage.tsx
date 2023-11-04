import { useEffect, useState } from "react";

export function PersonalMessage() {
  const [welcomeText, setWelcomeText] = useState("We are sorry for your loss");
  const nameOfDeceased = "Mary";
  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(
          `http://localhost:8000/get-personal-welcome-message?name_of_deceased=${nameOfDeceased}`
        );
        const foo = await result.json();
        setWelcomeText(foo.message.completion);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return <div>{welcomeText}</div>;
}
