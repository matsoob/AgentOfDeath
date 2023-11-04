import { Inter } from "next/font/google";
import { WelcomePage } from "./welcomePage";
import { WelcomeBackPage } from "./welcomeBackPage";
import { useEffect, useState } from "react";
import { PersonalMessage } from "./personalWelcomeMessage";
import { SubscriptionManager } from "./addSubscription";
import { PdfParser } from "./pdf";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

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

  const tabTailwind =
    "py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer";
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <Tabs className="bg-gray-100 p-4">
        <TabList className="flex space-x-4">
          <Tab className={tabTailwind}>Welcome</Tab>
          <Tab className={tabTailwind}>PDF</Tab>
          <Tab className={tabTailwind}>List of Subscriptions</Tab>
          <Tab className={tabTailwind}>New Tab</Tab>
          <Tab className={tabTailwind}>New Tab 2</Tab>
        </TabList>
        <TabPanel>
          {isFirstTimeUser ? (
            <WelcomePage
              setIsFirstTimeUser={setIsFirstTimeUser}
              setDeceasedName={setDeceasedName}
            />
          ) : (
            <PersonalMessage deceasedName={deceasedName} />
          )}
        </TabPanel>
        <TabPanel>
          <PdfParser />
        </TabPanel>
        <TabPanel>
          <SubscriptionManager />
        </TabPanel>
        <TabPanel>
          <div className="p-4 shadow-md">
            <div>Example new tab content</div>
          </div>
        </TabPanel>
        <TabPanel>
          <div>Example new tab content 2</div>
        </TabPanel>
      </Tabs>
      {/* {isFirstTimeUser ? (
        <WelcomePage
          setIsFirstTimeUser={setIsFirstTimeUser}
          setDeceasedName={setDeceasedName}
        />
      ) : (
        <PersonalMessage deceasedName={deceasedName} />
      )} */}
    </main>
  );
}
