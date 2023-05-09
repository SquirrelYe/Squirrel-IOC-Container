/**
 * @description 服务节点数据结构
 * @author willye
 * @time 2023.04.02 14:57:47
 *    - data表示当前节点的数据
      - incoming是一个Map<String, Node>类型，map中的记录的每个节点Node'，表示以当前节点Node为起始，Node'为终点的一条有向边。
      - outgoing 和incoming类似，只是有向边的方向正好和incoming相反，表示Node'到Node的一条有向边。
 */
export class Node {
    constructor(data) {
        this.incoming = new Map();
        this.outgoing = new Map();
        this.data = data;
    }
}
/**
 * @description 节点图数据结构
 * @author willye
 * @time 2023.04.02 14:59:45
 *    - _nodes 记录着图中的所有节点Node
      - roots() 返回这个图中的所有根节点（没有一条边是以这个节点为起始的节点）
      - insertEdge(from, to) 插入一条有向边，方向为from ---> to
      - removeNode(data) 移除一个节点Node
      - lookupOrInsertEdge(data) 插入一个节点
      - lookup(data) 获取一个节点
      - isEmpty() 当前图是否存在节点，不存在任何节点返回true，存在返回false
 */
export class Graph {
    constructor(_hashFn) {
        this._hashFn = _hashFn;
        // _nodes 记录着图中的所有节点Node
        this._nodes = new Map();
    }
    // roots() 返回这个图中的所有根节点（没有一条边是以这个节点为起始的节点）
    roots() {
        const ret = [];
        for (const node of this._nodes.values()) {
            if (node.outgoing.size === 0) {
                ret.push(node);
            }
        }
        return ret;
    }
    // insertEdge(from, to) 插入一条有向边，方向为from ---> to
    insertEdge(from, to) {
        const fromNode = this.lookupOrInsertNode(from);
        const toNode = this.lookupOrInsertNode(to);
        fromNode.outgoing.set(this._hashFn(to), toNode);
        toNode.incoming.set(this._hashFn(from), fromNode);
    }
    // removeNode(data) 移除一个节点Node
    removeNode(data) {
        const key = this._hashFn(data);
        this._nodes.delete(key);
        for (const node of this._nodes.values()) {
            node.outgoing.delete(key);
            node.incoming.delete(key);
        }
    }
    // lookupOrInsertEdge(data) 插入一个节点
    lookupOrInsertNode(data) {
        const key = this._hashFn(data);
        let node = this._nodes.get(key);
        if (!node) {
            node = new Node(data);
            this._nodes.set(key, node);
        }
        return node;
    }
    // lookup(data) 获取一个节点
    lookup(data) {
        return this._nodes.get(this._hashFn(data));
    }
    // isEmpty() 当前图是否存在节点，不存在任何节点返回true，存在返回false
    isEmpty() {
        return this._nodes.size === 0;
    }
    toString() {
        const data = [];
        for (const [key, value] of this._nodes) {
            data.push(`Graph key: ${key}, incoming: [${[...value.incoming.keys()].join(', ')}], outgoing: [${[...value.outgoing.keys()].join(',')}]`);
        }
        return data.join('\n');
    }
    // findCycleSlow() 从图中找到一个环路，此方法耗时较长，仅在异常情况下使用
    findCycleSlow() {
        for (const [id, node] of this._nodes) {
            const seen = new Set([id]);
            const res = this._findCycle(node, seen);
            if (res)
                return res;
        }
        return undefined;
    }
    _findCycle(node, seen) {
        for (const [id, outgoing] of node.outgoing) {
            if (seen.has(id)) {
                return [...seen, id].join(' -> ');
            }
            seen.add(id);
            const value = this._findCycle(outgoing, seen);
            if (value) {
                return value;
            }
            seen.delete(id);
        }
        return undefined;
    }
}
//# sourceMappingURL=ioc.graph.js.map