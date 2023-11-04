import React, { useState } from "react";
import * as pdfjs from "pdfjs-dist";

function PdfParser() {
  const [pdfText, setPdfText] = useState("");

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
          <p>Drag and drop a PDF file here</p>
        </div>
      )}
      {pdfText && (
        <div>
          <pre>{pdfText ? "Success" : "Please upload something"}</pre>
        </div>
      )}
    </div>
  );
}

export default PdfParser;
