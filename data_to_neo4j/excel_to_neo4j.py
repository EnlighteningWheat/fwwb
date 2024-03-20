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
def xlsf_to_neo4j(folder_path,graph):
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
        xls_path = os.path.join(folder_path, file)
        _node=xls_to_neo4j(xls_path,graph)
        relation = Relationship(folder_node, '问题集', _node)
        graph.create(relation)

#将xls文件转换为neo4j
def xls_to_neo4j(xls_path,graph):
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
        question_type=get_str(row['题目类型'])
        big_question=get_str(row['大题题干'])
        small_question =get_str(row['小题题干'])
        level_difficulty=get_str(row['难易度'])
        op_num = get_str(row['选项数'])
        if not op_num:
            op_num='填空项'
        option=[]
        for op in  range(ord('A'), ord('Z')+1):
            option.append(get_str(row[f'选项{chr(op)}']))
        answers_text=get_str(row['正确答案'])
        if not answers_text:
            answers_text='选项全为答案'
        analysis=get_str(row['答案解析'])
        goal=get_str(row['课程目标'])

        #标题连接大题干
        subject_node = Node("大题题干", name=big_question)
        graph.create(subject_node)
        relation = Relationship(_node, "大题题干",subject_node)
        graph.create(relation)

        #大题干连接杂项
        append_relation('题目类型',subject_node,question_type,graph)
        append_relation('小题题干',subject_node,small_question,graph)
        append_relation('难易度',subject_node,level_difficulty,graph)
        append_relation('正确答案', subject_node, answers_text,graph)
        append_relation('答案解析',subject_node,analysis,graph)
        append_relation('课程目标',subject_node,goal,graph)
        object_node = Node('选项数', name=op_num)
        relation = Relationship(subject_node, '选项数', object_node)
        graph.create(relation)

        #选项数下连接各个选项
        subject_node = object_node
        for index, op in enumerate(option):
            append_relation(f'选项{chr(index+65)}', subject_node, op,graph)

    return _node


if __name__ == '__main__':
    # 连接到Neo4j数据库
    graph = Graph("neo4j://localhost:7687", auth=("neo4j", "Zzy12802@"))
    # 清空数据库
    graph.delete_all()
    folder_path='D:\服务外包大赛\O_O\data\试卷库(excel)'
    xlsf_to_neo4j(folder_path,graph)
