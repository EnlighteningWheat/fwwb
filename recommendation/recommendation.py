import os
from py2neo import Graph, Node, Relationship

#利用节点关系的深浅来查询推荐
def get_recommendation_by_rels(graph, num, name):
    query = (
        "MATCH (startNode {name: $name})-[rels*]->(endNode) "
    "WITH startNode, endNode, size(rels) AS totalDistance, rels "
    "ORDER BY totalDistance ASC, last(rels).created_at DESC "
    "LIMIT $num "
    "RETURN endNode, collect(rels) AS relationships"
    )
    # 执行查询并获取结果
    results = graph.run(query,num=num,name=name)

    #print(results)
    for record in results:
        end_node = record["endNode"]
        relationships = record["relationships"]

        # 获取节点的属性值
        end_node_name = end_node['name']
        #print(type(relationships[0][0]))
        relationship_type = str(type(relationships[0][0])).split('.')[-1][:-2]
        print(f"End Node: {end_node_name}, Relationships: {relationship_type}")

#在标准题目库中查询推荐题目
def get_recommendation_by_question(graph, num, name):
    query = (
        "MATCH (n:大题题干) WHERE n.name =~ $name "
        "RETURN n LIMIT $num"
    )
    results = graph.run(query, name=f".*{name}.*", num=num)

    for record in results:
        end_node = record["n"]
        end_node_name = end_node['name']
        print(f"Question: {end_node_name}")

#利用相同标签查询指定节点的相似节点
def get_related_nodes_by_label(graph, num, name):
    # 查询节点的标签
    label_query = (
        "MATCH (n {name: $name}) "
        "RETURN labels(n) AS labels"
    )
    label_result = graph.run(label_query, name=name)
    node_labels = None
    for record in label_result:
        node_labels = record["labels"]

    if node_labels:
        # 查询具有相同标签的其他节点
        related_nodes_query = (
            f"MATCH (m:{node_labels[0]}) "
            "WHERE m.name <> $name "
            "RETURN m.name AS related_name "
            "LIMIT $num"
        )
        results = graph.run(related_nodes_query, name=name, num=num)

        for record in results:
            related_node_name = record["related_name"]
            print(f"Related Node: {related_node_name}")
    else:
        print(f"No labels found for node '{name}'")


if __name__ == '__main__':
    graph = Graph("neo4j://localhost:7687", auth=("neo4j", "Zzy12802@"))
    #get_recommendation_by_rels(graph, 10, '杜甫')
    #get_recommendation_by_question(graph, 10, '杜甫')
    #get_related_nodes_by_label(graph,10,'中华传统文化号为儒释道三家并存，释家文化作为外来文化传入中国的朝代是_______')
    #朝代