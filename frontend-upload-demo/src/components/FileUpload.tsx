import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { FileText } from 'lucide-react';
import React from 'react';

// Define FileItem type
interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  preview?: string | ArrayBuffer | null;
}

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const preview = file.type.startsWith('image/')
          ? reader.result // result is a base64 image for images
          : file.type === 'text/plain'
          ? reader.result // result is text for text files
          : null;

        setFiles((prev) => [
          ...prev,
          {
            id: uuidv4(),
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            preview,
          },
        ]);
      };

      // Read file as base64 for images or text for text files
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file); // for images
      } else {
        reader.readAsText(file); // for text files
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-dashed border-4 rounded-xl p-10 text-center transition-all duration-200 ${
        isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()}/>
      <p className="text-xl font-semibold mb-4">Drag and drop files here</p>
      {files.map((file) => (
        <div key={file.id} className="my-4 text-left">
          <div className="flex items-center gap-4">
            <FileText className="text-blue-500" />
            <div className="flex-1">
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">
                {Math.round(file.size / 1024)} KB • {file.type}
              </p>

              {file.preview && typeof file.preview === 'string' && file.type.startsWith('image/') && (
                <img 
                  src={file.preview}
                  alt={file.name}
                  className="mt-2 w-[400px] h-[300px]"
                />
              )}

              {file.preview && typeof file.preview === 'string' && file.type === 'text/plain' && (
                <pre className="mt-2 text-sm text-gray-700 bg-gray-100 p-2 rounded max-h-32 overflow-auto">
                  {file.preview}
                </pre>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main component to render the upload UI
export default function App() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <FileUpload />
    </div>
  );
}