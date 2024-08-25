import { useRef, useState } from "react";
import { TreeSerializer } from "../services/TreeSerializer";
import { Tree as ITree, TreeNode } from "../types/Tree";
import { Node } from "./Node";

export const Tree: React.FC = () => {
  const [tree, setTree] = useState<ITree| null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const initializeRoot = (rootName: string) => {
		const root = new TreeNode(rootName, 0);
		setTree({ root });
	};

  const handleAddChild = (parent: TreeNode) => {
    const name = prompt('Nome');
    if (name) addNode(parent, name);
  };

  const addNode = (parent: TreeNode, name: string) => {
		if (!tree) return;
		if (parent.children.some(child => child.name === name)) {
			alert("Nome inválido! Já existe um nó com esse nome.")
			return;
		}

    const newNode = new TreeNode(name, parent.depth + 1);
    parent.addChild(newNode);
    
    setTree({...tree});
  };

	const handleDelete = (parent: TreeNode, nodeToDelete: TreeNode) => {
		if (!tree) return;

		parent.deleteChild(nodeToDelete);
    setTree({...tree});
	}

	const downloadTreeAsJson = (tree: ITree) => {
		const jsonString = TreeSerializer.toJson(tree);
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		
		const link = document.createElement('a');
		link.href = url;
		link.download = `${tree.root.name}.json`;
		
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	};

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = e.target?.result as string;
          const newTree = TreeSerializer.fromJson(json);
          setTree(newTree);
        } catch (error) {
          console.error('Falha ao ler árvore do arquivo', error);
          alert('Falha ao ler árvore do arquivo');
        }
      };
      reader.readAsText(file);
    }
  };

	if (!tree) {
		return (
		<div>
        <h1>Gerador de Árvores</h1>
        <button onClick={() => {
          const rootName = prompt('Qual é o nome da Árvore?');
          if (rootName) initializeRoot(rootName);
        }}>
          Criar nó raiz
        </button>
				<input 
					type="file" 
					onChange={handleFileUpload} 
					accept=".json"
				/>
		</div>
		)
	}

  return (
    <div>
      <h1>{tree.root.name}</h1>
			<button onClick={() => setTree(null)}>
				Deletar Árvore
			</button>
			<button onClick={() => downloadTreeAsJson(tree)}>Download Tree as JSON</button>
      <Node node={tree.root} handleAddChild={handleAddChild} handleDeleteChild={handleDelete} parent={null} />
    </div>
  );
};
