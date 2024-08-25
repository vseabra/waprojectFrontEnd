// Libs
import React, { useRef } from "react";

// Components
import { Button } from "../ui/button";

// Styles
import "./FileInput.css";

interface FileInputProps {
  onFileLoaded: (content: string) => void;
  acceptedFileTypes?: string;
  buttonText?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  onFileLoaded,
  acceptedFileTypes = ".json",
  buttonText = "Carregar Arquivo",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          onFileLoaded(content);
        } catch (error) {
          console.error("Falha ao ler arquivo", error);
          alert("Falha ao ler arquivo");
        }
      };
      reader.readAsText(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-input-container">
      <Button
        className="file-input-btn"
        variant="secondary"
        onClick={triggerFileInput}
      >
        {buttonText}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        accept={acceptedFileTypes}
        style={{ display: "none" }}
      />
    </div>
  );
};
