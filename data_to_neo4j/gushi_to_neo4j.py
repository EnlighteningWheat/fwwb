import os

from py2neo import Graph, Node, Relationship
import json
import pandas as pd
import pandas
def append_relation(relation,subject_node,object_node_value,graph):
    if not object_node_value:
        return
    object_node = graph.nodes.match(relation, name=object_node_value).first()
    if not object_node:
        object_node = Node(relation, name=object_node_value)
        graph.create(object_node)
    relation = Relationship(subject_node, relation, object_node)
    graph.create(relation)

def gushif_to_neo4j(folder_path,graph):
    # 获取文件夹下所有文件名
    files_in_folder = os.listdir(folder_path)
    # 遍历并输出每个文件的完整路径
    for file in files_in_folder:
        # 构造并输出每个文件的完整路径
        xls_path = os.path.join(folder_path, file)
        _node=gushi_to_neo4j(xls_path,graph)


#将诗集文件中一些基本信息转换为neo4j：诗名，朝代，内容，简介
def gushi_to_neo4j(xls_path,graph):
    def get_str(val):
        if pandas.isnull(val):
            return ''
        else:
            return str(val)

    # 读取XLS文件
    df = pd.read_excel(xls_path)

    #获取文件名
    xls_name = os.path.basename(xls_path)
    _node = graph.nodes.match('问题集', name=xls_name).first()
    if not _node:
        _node = Node('问题集', name=xls_name)
        graph.create(_node)


    for num,row in df.iterrows():
        #提取数据，初始化变量
        shi_ming=get_str(row['诗名'])
        chao_dai=get_str(row['朝代'])
        zuo_zhe=get_str(row['作者'])
        nei_rong=get_str(row['内容'])
        jian_jie = get_str(row['简介'])
        if not zuo_zhe:
            zuo_zhe='匿名'

        #创建主体——诗歌内容
        subject_node = Node("内容", name=nei_rong)
        graph.create(subject_node)

        #大题干连接杂项
        if shi_ming:
            append_relation('诗名',subject_node,shi_ming,graph)
        if chao_dai:
            append_relation('朝代',subject_node,chao_dai,graph)
        if zuo_zhe:
            append_relation('作者',subject_node,zuo_zhe,graph)
        if jian_jie:
            append_relation('简介', subject_node, jian_jie,graph)

    return _node


if __name__ == '__main__':
    # 连接到Neo4j数据库
    graph = Graph("neo4j://localhost:7687", auth=("neo4j", "Zzy12802@"))
    # 清空数据库
    graph.delete_all()
    folder_path='D:\服务外包大赛\O_O\data\古诗'
    gushif_to_neo4j(folder_path,graph)
