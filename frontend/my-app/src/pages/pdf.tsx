import React, { Dispatch, SetStateAction, useState } from "react";
import * as pdfjs from "pdfjs-dist";

async function sendToBankStatementEndpoint(content: string) {
  const data = { statementContent: content };
  try {
    // name_of_sub: str, status
    const result = await fetch(`http://localhost:8000/submit-bank-statement`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      return (await result.json()).message as unknown as Array<string>;
    } else {
      throw new Error("There was an error Submitting to the Extract Endpoint");
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export interface PdfParserProps {
  dragAndDropTitle: string;
  submitButtonTitle: string;
  submitted?: boolean;
  setSubmittedResponse?: Dispatch<SetStateAction<Array<string>>>;
  submittedResponse?: Array<string>;
}
export function PdfParser(props: PdfParserProps) {
  const [pdfText, setPdfText] = useState("");

  const submitParsePdf = async () => {
    const response = await sendToBankStatementEndpoint(pdfText);
    if (props.setSubmittedResponse) {
      console.log("setSubmittedResponse");
      console.log(response);
      props.setSubmittedResponse(response);
      props;
    } else {
      console.log("missing setSubmittedResponse");
    }
  };

  const shouldBeAbleToSubmit = () => {
    !!pdfText && pdfText.length > 1000;
  };
  const handleDrop = async (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const arrayBuffer = e.target.result;

        // Initialize PDF.js
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

        // Load the PDF
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        const numPages = pdf.numPages;
        let text = "";

        // Extract text from each page
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const pageText = await page.getTextContent();
          pageText.items.forEach((item) => {
            text += item.str + " ";
          });
        }

        setPdfText(text);
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {!pdfText && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            width: "300px",
            height: "200px",
            border: "2px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>{props.dragAndDropTitle}</p>
        </div>
      )}
      {pdfText && props.submittedResponse?.length === 0 && (
        <div>
          <pre>
            {pdfText ? "Statement Uploaded" : "Something went wrong..."}
          </pre>
          <button onClick={submitParsePdf} disabled={!shouldBeAbleToSubmit}>
            {props.submitButtonTitle}
          </button>
        </div>
      )}
    </div>
  );
}
