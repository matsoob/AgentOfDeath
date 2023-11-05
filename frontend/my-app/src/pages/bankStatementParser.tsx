import { useState } from "react";
import { PdfParser } from "./pdf";

interface BankStatementProps {}

async function addSubscription(sub_name: string) {
  try {
    // name_of_sub: str, status
    const result = await fetch(
      `http://localhost:8000/add-sub?name_of_sub=${sub_name}`
    );
    if (result.ok) {
      return;
    } else {
      throw new Error("There was an error adding subscription to the list");
    }
  } catch (e) {
    console.log(e);
  }
}

function listOfSubscriptionsToAdd(subscriptions: Array<string>) {
  return (
    <div className="mb-6">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Name of Subscription</th>
            <th className="py-2 px-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((val, key) => (
            <tr key={key} className="hover:bold">
              <td className="py-2 px-4">{val}</td>
              <td className="py-2 px-4 text-center">Do you want this added?</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BankStatementParser(props: BankStatementProps) {
  const [submittedResponse, setSubmittedResponse] = useState(
    [] as Array<string>
  );
  return (
    <div>
      <PdfParser
        dragAndDropTitle="Drag and Drop a Bank Statement"
        submitButtonTitle="Try to find subscriptions"
        setSubmittedResponse={setSubmittedResponse}
        submittedResponse={submittedResponse}
      />
      {submittedResponse.length > 0 &&
        listOfSubscriptionsToAdd(submittedResponse)}
    </div>
  );
}
