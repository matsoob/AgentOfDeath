import { Dispatch, FC, SetStateAction, useState } from "react";
import WelcomeForm from "./welcomeForm";

export interface WelcomePageProps {
  setIsFirstTimeUser: Dispatch<SetStateAction<boolean>>;
  setDeceasedName: Dispatch<SetStateAction<string>>;
}

export const WelcomePage: FC<WelcomePageProps> = ({
  setIsFirstTimeUser,
  setDeceasedName,
}) => {
  return (
    <div>
      <span className="mt-50">
        Welcome to Agent. We are very sorry for your loss.
      </span>
      <br />
      <br />
      <div>
        {" "}
        <div className="mt-50">
          <p>What is the name of the deceased person?</p>
          <input
            type="text"
            onChange={(e) => setDeceasedName(e.target.value)}
            placeholder="Enter name here"
            className="mt-50"
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
