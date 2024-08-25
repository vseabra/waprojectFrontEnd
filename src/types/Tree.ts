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

  deleteChild(child: TreeNode) {
    const childIndex = this.children.indexOf(child);

    this.children.splice(childIndex, 1);
  }
}

export interface Tree {
  root: TreeNode;
}
