import { useEffect, useState } from "react";

interface PersonalMessagePropts {
  deceasedName: string;
}

export function PersonalMessage(props: PersonalMessagePropts) {
  const [welcomeText, setWelcomeText] = useState("We are sorry for your loss");
  const nameOfDeceased = props.deceasedName;
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
