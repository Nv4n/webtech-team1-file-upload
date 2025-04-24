import React from "react";
import FileUpload from "./components/FileUpload";
import SimpleUploader from "./components/SimpleUpload";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">File Upload</h1>
      <SimpleUploader />
      <FileUpload />
    </div>
  );
}
