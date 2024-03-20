import os

from py2neo import Graph, Node, Relationship
import json
import pandas as pd
import pandas
def pptf_to_neo4j(folder_path,graph):
    # 获取文件夹下所有文件名
    files_in_folder = os.listdir(folder_path)
    folder_name = os.path.basename(folder_path)
    folder_node = graph.nodes.match('问题库', name=folder_name).first()
    if not folder_node:
        folder_node = Node('问题库', name=folder_name)
        graph.create(folder_node)

    # 遍历并输出每个文件的完整路径
    for file in files_in_folder:
        # 构造并输出每个文件的完整路径
        _node = graph.nodes.match('问题集', name=file).first()
        if not _node:
            _node = Node('问题集', name=file)
            graph.create(_node)
        relation = Relationship(folder_node, '问题集', _node)
        graph.create(relation)


if __name__ == '__main__':
    # 连接到Neo4j数据库
    graph = Graph("neo4j://localhost:7687", auth=("neo4j", "Zzy12802@"))
    # 清空数据库
    graph.delete_all()
    folder_path='D:\服务外包大赛\O_O\data\课件'
    pptf_to_neo4j(folder_path,graph)
