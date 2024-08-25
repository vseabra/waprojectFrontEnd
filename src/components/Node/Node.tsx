// Libs
import React from "react";


// Types
import { TreeNode } from "../../types/Tree";

// Components
import {
  Collapsible,
  CollapsibleContent,
} from "../ui/collapsible";

import {
  Button,
} from "../ui/button";

// Styles
import './Node.css'
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";

interface NodeProps {
  node: TreeNode;
  parent: TreeNode | null;
  handleAddChild: (parent: TreeNode) => void;
  handleDeleteChild: (parent: TreeNode, nodeToDelete: TreeNode) => void;
}

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
			<div className='node'>
				<div className='node-name'>{self.name}</div>

				<div className='node-actions'>
					<Button variant="outline" onClick={() => handleAddChild(self)}>adicionar</Button>

					{parent && (
						<Button  variant="outline" onClick={() => handleDeleteChild(parent, self)}>remover</Button>
					)}


					{self.children.length > 0 && <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>{isOpen ? (<ChevronsDownUp/>) : (<ChevronsUpDown/>)}</Button>}
				</div>
			</div>


				<div className='child'>
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
