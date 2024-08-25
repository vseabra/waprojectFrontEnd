import { TreeNode } from "../types/Tree";

interface NodeProps {
  node: TreeNode;
  parent: TreeNode | null;
  handleAddChild: (parent: TreeNode) => void;
  handleDeleteChild: (parent: TreeNode, nodeToDelete: TreeNode) => void;
}

export const Node: React.FC<NodeProps> = ({ node: self, parent, handleAddChild, handleDeleteChild }) => {
	const identSize = 20;

	return (
    <div style={{ marginLeft: `${self.depth * identSize}px` }}>

      {self.name}

      <button onClick={() => handleAddChild(self)}>Add Child</button>

      {parent && (
        <button onClick={() => handleDeleteChild(parent, self)}>Delete</button>
      )}

      {self.children.map((child, index) => (
        <Node key={index} node={child} handleAddChild={handleAddChild} handleDeleteChild={handleDeleteChild} parent={self} />
      ))}

    </div>)
}
