export class TreeNode {
  public name: string;
  public children: TreeNode[] = [];
  public depth: number;

  constructor(name: string, depth: number) {
    this.name = name;
    this.depth = depth;
  }

  addChild(child: TreeNode) {
    this.children.push(child);
  }
}

export interface Tree {
  root: TreeNode;
}
