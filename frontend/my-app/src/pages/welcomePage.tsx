import { Dispatch, FC, SetStateAction } from "react";

export interface WelcomePageProps {
  setIsFirstTimeUser: Dispatch<SetStateAction<boolean>>;
}

export const WelcomePage: FC<WelcomePageProps> = ({ setIsFirstTimeUser }) => {
  return (
    <div>
      <span>Welcome to Agent. We are very sorry for your loss.</span>
      <div>
        {" "}
        <button
          onClick={() => {
            setIsFirstTimeUser(false);
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
