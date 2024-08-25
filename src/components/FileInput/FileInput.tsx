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

/**
 * FileInput
 * 
 * O componente `FileInput` permite ao usuário carregar arquivos a partir do sistema de arquivos local. 
 * Ele é usado para selecionar e processar arquivos e invoca uma função de callback 
 * com o conteúdo do arquivo carregado.
 * 
 * **Dependências:**
 * - React: Para manipulação de estado e renderização do componente.
 * - Button: Componente de UI para acionar o carregamento do arquivo.
 * 
 * **Props:**
 * - `onFileLoaded` (Function): Função de callback chamada com o conteúdo do arquivo carregado como uma string.
 * - `acceptedFileTypes` (string): Tipos de arquivos aceitos para upload. O padrão é `".json"`.
 * - `buttonText` (string): Texto exibido no botão que aciona a seleção do arquivo. O padrão é `"Carregar Arquivo"`.
 * 
 * **Estado Interno:**
 * - Não possui estado interno próprio; utiliza referências e callbacks para gerenciar o upload de arquivos.
 * 
 * **Referências:**
 * - `fileInputRef` (React.RefObject<HTMLInputElement>): Referência ao elemento de input do tipo `file`, utilizada para acionar o upload de arquivos.
 * 
 * **Funções:**
 * - `handleFileUpload(event: React.ChangeEvent<HTMLInputElement>)`: Função chamada quando um arquivo é selecionado. Lê o arquivo e invoca `onFileLoaded` com seu conteúdo.
 * - `triggerFileInput()`: Aciona o clique no input de arquivo para abrir o seletor de arquivos.
 * 
 * **Renderização:**
 * - Renderiza um botão que, quando clicado, aciona o seletor de arquivos.
 * - O input de arquivo é oculto (`style={{ display: "none" }}`) e é acionado programaticamente pelo botão.
 * 
 * **Exemplo de Uso:**
 * ```tsx
 * <FileInput
 *   onFileLoaded={(content) => {
 *     // Processar o conteúdo do arquivo
 *     console.log(content);
 *   }}
 *   acceptedFileTypes=".json"
 *   buttonText="Carregar JSON"
 * />
 * ```
 */
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
