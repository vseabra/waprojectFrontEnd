// Libs
import { useState } from "react";

// Services
import { TreeSerializer } from "../../services/TreeSerializer";

// Types
import { Tree as ITree, TreeNode } from "../../types/Tree";

// Components
import { Node } from "../Node/Node";
import { FileInput } from "../FileInput/FileInput";

// Styles
import "./Tree.css";

export const Tree: React.FC = () => {
  const [tree, setTree] = useState<ITree | null>(null);

  const initializeRoot = (rootName: string) => {
    const root = new TreeNode(rootName, 0);
    setTree({ root });
  };

  const handleAddChild = (parent: TreeNode) => {
    const name = prompt("Nome");
    if (name) addNode(parent, name);
  };

  const addNode = (parent: TreeNode, name: string) => {
    if (!tree) return;
    if (parent.children.some((child) => child.name === name)) {
      alert("Nome inválido! Já existe um nó com esse nome.");
      return;
    }

    const newNode = new TreeNode(name, parent.depth + 1);
    parent.addChild(newNode);

    setTree({ ...tree });
  };

  const handleDelete = (parent: TreeNode, nodeToDelete: TreeNode) => {
    if (!tree) return;

    parent.deleteChild(nodeToDelete);
    setTree({ ...tree });
  };

  const downloadTreeAsJson = (tree: ITree) => {
    const jsonString = TreeSerializer.toJson(tree);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${tree.root.name}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleFileContent = (content: string) => {
    try {
      const newTree = TreeSerializer.fromJson(content);
      setTree(newTree);
    } catch (error) {
      console.error("Falha ao processar árvore do arquivo", error);
      alert("Falha ao processar árvore do arquivo");
    }
  };

  if (!tree) {
    return (
      <div className="unitialized-header-container">
        <h1>Gerador de Árvores</h1>
        <div className="unitialized-header-actions">
          <button
            className="create-button"
            onClick={() => {
              const rootName = prompt("Qual é o nome da Árvore?");
              if (rootName) initializeRoot(rootName);
            }}
          >
            Criar nó raiz
          </button>
          <FileInput
            onFileLoaded={handleFileContent}
            acceptedFileTypes=".json"
            buttonText="Carregar Árvore"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>{tree.root.name}</h1>
      <button onClick={() => setTree(null)}>Deletar Árvore</button>
      <button onClick={() => downloadTreeAsJson(tree)}>
        Download Tree as JSON
      </button>
      <Node
        node={tree.root}
        handleAddChild={handleAddChild}
        handleDeleteChild={handleDelete}
        parent={null}
      />
    </div>
  );
};
