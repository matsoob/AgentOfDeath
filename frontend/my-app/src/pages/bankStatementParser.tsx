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
      />
      {submittedResponse.length > 0 && <button>Button</button>}
    </div>
  );
}
