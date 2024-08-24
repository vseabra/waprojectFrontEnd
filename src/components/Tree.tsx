import { useState } from "react";
import { Tree as TTree, TreeNode } from "../types/Tree";
import { Node } from "./Node";

export const Tree: React.FC = () => {
  const [tree, setTree] = useState<TTree>({
    root: new TreeNode('Root', 1)
  });

  const addNode = (parent: TreeNode, name: string) => {
    const newNode = new TreeNode(name, parent.depth + 1);
    parent.addChild(newNode);
    
    setTree({ ...tree });
  };

  const handleAddChild = (parent: TreeNode) => {
    const name = prompt('Enter node name:');
    if (name) addNode(parent, name);
  };

  return (
    <div>
      <h1>Tree</h1>
      <Node node={tree.root} onAddChild={handleAddChild} />
    </div>
  );
};
