import os

from py2neo import Graph, Node, Relationship
import json
import pandas as pd
import pandas

def json_files_to_neo4j( folder_path,graph):
    for filename in os.listdir(folder_path):
        if filename.endswith(".json"):
            json_path = os.path.join(folder_path, filename)
            json_to_neo4j(json_path, graph)
def json_to_neo4j(json_path,graph):
    with open(json_path, 'r', encoding='utf-8') as file:
        json_data=json.load(file)

    for item in json_data:
        text = item.get('text', '')
        for spo in item.get('spo_list', []):
            if len(spo) < 3:
                continue
            subject_name, relation, object_name = spo
            # 创建或获取实体节点
            if not relation:
                continue
            subject_node = graph.nodes.match("Entity", name=subject_name).first()
            if not subject_node:
                subject_node = Node("Entity", name=subject_name)
                graph.create(subject_node)
            object_node = graph.nodes.match("Entity", name=object_name).first()
            if not object_node:
                object_node = Node("Entity", name=object_name)
                graph.create(object_node)

            existing_rels = graph.match(nodes=[subject_node, object_node], r_type=relation)
            if not list(existing_rels):
                # 若不存在，则创建新的关系
                relation = Relationship(subject_node, relation, object_node)
                graph.create(relation)


if __name__ == '__main__':
    # 连接到Neo4j数据库
    graph = Graph("neo4j://localhost:7687", auth=("neo4j", "Zzy12802@"))
    # 清空数据库
    graph.delete_all()

