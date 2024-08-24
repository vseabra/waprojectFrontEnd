import { TreeNode } from "../types/Tree";

interface NodeProps {
  node: TreeNode;
  onAddChild: (parent: TreeNode) => void;
}

export const Node: React.FC<NodeProps> = ({ node, onAddChild}) => {
	return (
    <div style={{ marginLeft: `${node.depth * 20}px` }}>

      {node.name}

      <button onClick={() => onAddChild(node)}>Add Child</button>

      {node.children.map((child, index) => (
        <Node key={index} node={child} onAddChild={onAddChild} />
      ))}

    </div>)
}
