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

/**
 * Tree
 * 
 * O componente `Tree` é um gerenciador de estrutura de árvore que permite criar, adicionar filhos, deletar
 * e exportar árvores em formato JSON. Ele também possibilita o carregamento de árvores a partir de arquivos JSON.
 * 
 * **Dependências:**
 * - React: Para manipulação de estado e renderização do componente.
 * - TreeSerializer: Serviço para serializar e desserializar a árvore em JSON.
 * - Button, FileInput: Componentes de UI para interações com o usuário.
 * - Node: Componente que representa um nó da árvore.
 * 
 * **Estados:**
 * - `tree` (ITree | null): Representa a árvore atual. Inicialmente é `null` até que o usuário crie ou carregue uma árvore.
 * 
 * **Funções:**
 * - `initializeRoot(rootName: string)`: Inicializa a árvore com um nó raiz. Recebe o nome do nó raiz como parâmetro.
 * - `handleAddChild(parent: TreeNode)`: Solicita ao usuário o nome de um novo nó e adiciona-o como filho do nó especificado.
 * - `addNode(parent: TreeNode, name: string)`: Adiciona um novo nó ao nó pai especificado, verificando se já existe um nó com o mesmo nome.
 * - `handleDelete(parent: TreeNode, nodeToDelete: TreeNode)`: Deleta um nó específico e todos os seus filhos, após confirmação do usuário.
 * - `downloadTreeAsJson(tree: ITree)`: Exporta a árvore atual em um arquivo JSON e inicia o download.
 * - `handleFileContent(content: string)`: Processa o conteúdo de um arquivo JSON para atualizar a árvore, com tratamento de erros.
 * 
 * **Renderização Condicional:**
 * - Se `tree` for `null`, renderiza uma tela de boas-vindas com opções para criar uma nova árvore ou carregar uma árvore existente.
 * - Se `tree` não for `null`, renderiza a árvore atual com opções para baixar a árvore como JSON ou deletá-la. Também exibe a árvore na interface com o componente `Node`.
 * 
 * **Estrutura HTML:**
 * - Para árvore não inicializada:
 *   - Exibe um título e dois botões: "Criar Nova Árvore" e "Carregar Árvore" (usando `FileInput`).
 * - Para árvore inicializada:
 *   - Exibe o nome da árvore atual e dois botões: "Baixar JSON" e "Deletar Árvore".
 *   - Renderiza o componente `Node`  com o nó raiz da árvore.
 * 
 * **Exemplo de Uso:**
 * ```tsx
 * <Tree />
 * ```
 */
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
      <div className="header uninitialized-header-container">
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
      <div className="header initialized-header-container">
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
