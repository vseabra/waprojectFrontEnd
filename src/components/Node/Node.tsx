// Libs
import React from "react";

// Types
import { TreeNode } from "../../types/Tree";

// Components
import { Collapsible, CollapsibleContent } from "../ui/collapsible";

import { Button } from "../ui/button";

// Styles
import "./Node.css";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";

interface NodeProps {
  node: TreeNode;
  parent: TreeNode | null;
  handleAddChild: (parent: TreeNode) => void;
  handleDeleteChild: (parent: TreeNode, nodeToDelete: TreeNode) => void;
}

/**
 * Node
 * 
 * O componente `Node` representa um nó em uma estrutura de árvore. Ele exibe o nome do nó e fornece 
 * botões para adicionar e remover filhos, bem como para expandir e contrair a exibição dos filhos do nó.
 * 
 * **Dependências:**
 * - React: Para manipulação de estado e renderização do componente.
 * - Collapsible, CollapsibleContent: Componentes para exibir e ocultar o conteúdo dos filhos de forma colapsável.
 * - Button: Componente de UI para botões de ação.
 * - ChevronsDownUp, ChevronsUpDown: Ícones para indicar o estado colapsado/expandido.
 * 
 * **Props:**
 * - `node` (TreeNode): O nó atual a ser exibido.
 * - `parent` (TreeNode | null): O nó pai do nó atual. Pode ser `null` se o nó não tiver pai (por exemplo, se for a raiz).
 * - `handleAddChild` (Function): Função para adicionar um filho ao nó atual.
 * - `handleDeleteChild` (Function): Função para remover o nó atual da árvore.
 * 
 * **Estado Interno:**
 * - `isOpen` (boolean): Indica se o conteúdo dos filhos está expandido (`true`) ou contraído (`false`).
 * 
 * **Renderização:**
 * - O componente renderiza um `div` com uma margem esquerda proporcional à profundidade do nó na árvore (`self.depth`).
 * - Exibe o nome do nó e inclui botões para adicionar um filho, remover o nó, e expandir/contrair a lista de filhos.
 * - Se o nó tiver filhos, utiliza o componente `Collapsible` para mostrar/ocultar a lista de filhos. 
 *   - A lista de filhos é renderizada recursivamente utilizando o próprio componente `Node`.
 * 
 * **Exemplo de Uso:**
 * ```tsx
 * <Node
 *   node={node}
 *   parent={parentNode}
 *   handleAddChild={handleAddChild}
 *   handleDeleteChild={handleDeleteChild}
 * />
 * ```
 */
export const Node: React.FC<NodeProps> = ({
  node: self,
  parent,
  handleAddChild,
  handleDeleteChild,
}) => {
  const identSize = 20;
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div style={{ marginLeft: `${self.depth * identSize}px` }}>
      <div className="node">
        <div className="node-name">{self.name}</div>

        <div className="node-actions">
          <Button variant="outline" onClick={() => { 
						handleAddChild(self)
						setIsOpen(true);
					}}>
            adicionar
          </Button>

          {parent && (
            <Button
              variant="outline"
              onClick={() => handleDeleteChild(parent, self)}
            >
              remover
            </Button>
          )}

          {self.children.length > 0 && (
            <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <ChevronsDownUp /> : <ChevronsUpDown />}
            </Button>
          )}
        </div>
      </div>

      <div className="child">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            {self.children.map((child, index) => (
              <Node
                key={index}
                node={child}
                handleAddChild={handleAddChild}
                handleDeleteChild={handleDeleteChild}
                parent={self}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
