// Libs
import { useState } from "react";

// Services
import { TreeSerializer } from "../../services/TreeSerializer";

// Types
import { Tree as ITree, TreeNode } from "../../types/Tree";

// Components
import { Node } from "../Node/Node";
import { Button } from "../ui/button";
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

    const isConfirmed = window.confirm(
      `Tem certeza que deseja deletar "${nodeToDelete.name}" e todos os seus filhos?`,
    );

    if (isConfirmed) {
      parent.deleteChild(nodeToDelete);
      setTree({ ...tree });
    }
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
      <div className="uninitialized-header-container">
        <h1>TreeCreator</h1>
        <div className="uninitialized-header-actions">
          <Button
            className="create-button"
            onClick={() => {
              const rootName = prompt("Qual é o nome da Árvore?");
              if (rootName) initializeRoot(rootName);
            }}
          >
            Criar Nova Árvore
          </Button>
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
    <>
      <div className="initialized-header-container">
        <h1>{tree.root.name}</h1>
        <div className="initialized-header-actions">
          <Button onClick={() => downloadTreeAsJson(tree)}>Baixar JSON </Button>
          <Button
            variant="destructive"
            onClick={() => {
              const isConfirmed = window.confirm(
                "Tens certeza que desejas deletar a árvore?"
              );

              if (isConfirmed) setTree(null);
            }}
          >
            Deletar Árvore
          </Button>
        </div>
      </div>
      <div className="tree-container">
        <Node
          node={tree.root}
          handleAddChild={handleAddChild}
          handleDeleteChild={handleDelete}
          parent={null}
        />
      </div>
    </>
  );
};
