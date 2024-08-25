import { Tree, TreeNode } from "../types/Tree";

interface JsonData {
  [key: string]: JsonData | string | number | boolean | null;
}

/**
 * TreeSerializer
 *
 * Essa classe é responsável por serializar e desserializar uma árvore.
 *
 */
export class TreeSerializer {
  public static toJson(tree: Tree): string {
    const formattedTree = this.toClassificationTree(tree.root);
    return JSON.stringify(formattedTree);
  }

  public static fromJson(json: string): Tree {
    const parseNode = (obj: any, name: string, depth: number = 0): TreeNode => {
      const node = new TreeNode(name, depth);
      for (const [childName, childValue] of Object.entries(obj)) {
        node.addChild(parseNode(childValue, childName, depth + 1));
      }
      return node;
    };

    const parsedObj = JSON.parse(json);
    const rootName = Object.keys(parsedObj)[0];
    return {
      root: parseNode(parsedObj[rootName], rootName),
    };
  }

  private static toClassificationTree(node: TreeNode): JsonData {
    const result: any = {};
    if (node.children.length === 0) {
      result[node.name] = {};
    } else {
      result[node.name] = node.children.reduce((acc, child) => {
        return { ...acc, ...this.toClassificationTree(child) };
      }, {});
    }
    return result;
  }
}
