import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

// async function firstTimeUser() {
//   try {
//     const result = await fetch("http://localhost:8000/is-first-time-user");
//     console.log("FETCH: ", result);
//     return result.text;
//   } catch (e) {
//     console.log(e);
//     return "testtest";
//   }
// }

export interface WelcomePageProps {
  setIsFirstTimeUser: Dispatch<SetStateAction<boolean>>;
}

export const WelcomePage: FC<WelcomePageProps> = ({ setIsFirstTimeUser }) => {
  //   const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  //   useEffect(() => {
  //     // Use `useEffect` for making the API call when the component mounts
  //     async function fetchData() {
  //       try {
  //         const data = await firstTimeUser();
  //         console.log(data);
  //         setIsFirstTimeUser(data);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }

  //     fetchData();
  //   }, []);

  return (
    <div>
      <span>Welcome to Agent. We are very sorry for your loss.</span>
      <button
        onClick={() => {
          setIsFirstTimeUser(false);
        }}
      >
        Get Started
      </button>
    </div>
  );
};
