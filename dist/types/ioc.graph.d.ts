/**
 * @description 服务节点数据结构
 * @author willye
 * @time 2023.04.02 14:57:47
 *    - data表示当前节点的数据
      - incoming是一个Map<String, Node>类型，map中的记录的每个节点Node'，表示以当前节点Node为起始，Node'为终点的一条有向边。
      - outgoing 和incoming类似，只是有向边的方向正好和incoming相反，表示Node'到Node的一条有向边。
 */
export declare class Node<T> {
    readonly data: T;
    readonly incoming: Map<string, Node<T>>;
    readonly outgoing: Map<string, Node<T>>;
    constructor(data: T);
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
export declare class Graph<T> {
    private readonly _hashFn;
    private readonly _nodes;
    constructor(_hashFn: (element: T) => string);
    roots(): Node<T>[];
    insertEdge(from: T, to: T): void;
    removeNode(data: T): void;
    lookupOrInsertNode(data: T): Node<T>;
    lookup(data: T): Node<T> | undefined;
    isEmpty(): boolean;
    toString(): string;
    findCycleSlow(): string;
    private _findCycle;
}
//# sourceMappingURL=ioc.graph.d.ts.map