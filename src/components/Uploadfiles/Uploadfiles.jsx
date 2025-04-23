import React, { useState } from "react";
import axios from "axios";

export default function CaseFileInterpreter() {
  const [files, setFiles] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary] = useState("");
  const [results, setResults] = useState([]);
  const [isSummaryDone, setIsSummaryDone] = useState(false);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => {
      const fileMap = new Map();
      [...prevFiles, ...newFiles].forEach((file) =>
        fileMap.set(`${file.name}-${file.size}`, file)
      );
      return Array.from(fileMap.values());
    });
    setExtractedText("");
    setSummary("");
    setResults([]);
    setIsSummaryDone(false);
  };
  

  const handleSummarize = async () => {
    if (!files.length) return alert("Please select files first!");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      // First, interpret the files
      const interpretRes = await axios.post("/api/interpret", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setExtractedText(interpretRes.data.text);

      // Then, summarize the text
      const summaryRes = await axios.post("/api/summarize", {
        text: interpretRes.data.text,
      });
      setSummary(summaryRes.data.summary);
      setIsSummaryDone(true);
    } catch (error) {
      console.error("Summarization error:", error);
    }
  };

  const handleResults = async () => {
    if (!extractedText) return alert("Please interpret files first!");

    try {
      const res = await axios.post("/api/results", { text: extractedText });
      setResults(res.data.matches);
    } catch (error) {
      console.error("Results error:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Case File Interpreter</h1>

      <input
        type="file"
        multiple
        accept=".pdf,.csv,.txt,image/*"
        onChange={handleFileChange}
        className="mb-4 block"
      />

      {/* Display selected file names */}
      {files.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Selected Files:</h2>
          <ul className="list-disc list-inside text-sm">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleSummarize}
          className="bg-[#00234E] text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Summarize
        </button>

        {isSummaryDone && (
          <button
            onClick={handleResults}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Results
          </button>
        )}
      </div>

      {extractedText && (
        <div className="mb-6">
          <h2 className="font-semibold text-lg">Extracted Text:</h2>
          <textarea
            className="w-full border rounded p-2 mt-2 h-40"
            value={extractedText}
            readOnly
          />
        </div>
      )}

      {summary && (
        <div className="mb-6">
          <h2 className="font-semibold text-lg">Summary:</h2>
          <p className="bg-gray-100 p-3 rounded">{summary}</p>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h2 className="font-semibold text-lg mb-2">Related Unsolved Cases:</h2>
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Case ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Probability</th>
              </tr>
            </thead>
            <tbody>
              {results.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td className="border p-2">{caseItem.id}</td>
                  <td className="border p-2">{caseItem.title}</td>
                  <td className="border p-2">
                    {(caseItem.probability * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
