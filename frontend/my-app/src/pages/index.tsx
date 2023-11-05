import { Inter } from "next/font/google";
import { WelcomePage } from "./welcomePage";
import { WelcomeBackPage } from "./welcomeBackPage";
import { useEffect, useState } from "react";
import { PersonalMessage } from "./personalWelcomeMessage";
import { SubscriptionManager } from "./addSubscription";
import { PdfParser } from "./pdf";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { BankStatementParser } from "./bankStatementParser";

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
  const [selectedTab, setSelectedTab] = useState(0);

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

  const tabTailwind = (tabIndex: number) => {
    if (selectedTab !== tabIndex) {
      return "py-2 px-4 rounded-t-lg cursor-pointer text-center flex items-center hover:mix-blend-screen hover:bg-darkgreen";
    } else {
      return "py-2 px-4 rounded-t-lg cursor-pointer text-center flex items-center mix-blend-screen bg-darkgreen";
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs>
        <TabList className="flex space-x-4 border-b-2 border-foregroundgreen">
          <Tab className={tabTailwind(0)} onClick={() => setSelectedTab(0)}>
            Welcome
          </Tab>
          <Tab className={tabTailwind(4)} onClick={() => setSelectedTab(4)}>
            Useful Resources
          </Tab>
          <Tab className={tabTailwind(1)} onClick={() => setSelectedTab(1)}>
            Add Bankstatement
          </Tab>
          <Tab className={tabTailwind(2)} onClick={() => setSelectedTab(2)}>
            Add Certificate
          </Tab>
          <Tab className={tabTailwind(3)} onClick={() => setSelectedTab(3)}>
            List of Subscriptions
          </Tab>
        </TabList>
        <TabPanel>
          <div className="p-4 shadow-md">
            {isFirstTimeUser ? (
              <WelcomePage
                setIsFirstTimeUser={setIsFirstTimeUser}
                setDeceasedName={setDeceasedName}
              />
            ) : (
              <PersonalMessage deceasedName={deceasedName} />
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-4 shadow-md">
            <a href="https://www.gov.uk/when-someone-dies">
              Government Step-by-Step Guide
            </a>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-4 shadow-md">
            <BankStatementParser />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-4 shadow-md">
            <PdfParser
              dragAndDropTitle="Drag and Drop a Certificate of Death"
              submitButtonTitle="Submit for Verification"
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-4 shadow-md">
            <SubscriptionManager
              nameOfDeceased={deceasedName}
              emailOfDeceased={"email@email.com"}
            />
          </div>
        </TabPanel>
      </Tabs>
    </main>
  );
}
