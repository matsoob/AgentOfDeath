import { Dispatch, FC, SetStateAction, useState } from "react";
import WelcomeForm from "./welcomeForm";

export interface WelcomePageProps {
  setIsFirstTimeUser: Dispatch<SetStateAction<boolean>>;
  setDeceasedName: Dispatch<SetStateAction<string>>;
}

export const WelcomePage: FC<WelcomePageProps> = ({ setIsFirstTimeUser, setDeceasedName }) => {

  return (
    <div>
      <span>Welcome to Agent. We are very sorry for your loss.</span>
      <div>
        {" "}
        <div>
          <p>What is the name of the deceased person?</p>
          <input
            type="text"
            onChange={(e) => setDeceasedName(e.target.value)}
            placeholder="Enter name here"
          />
        </div>
        <button
          onClick={() => {
            setIsFirstTimeUser(false);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
