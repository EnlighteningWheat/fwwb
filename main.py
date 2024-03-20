import os
from py2neo import Graph

from data_to_neo4j.excel_to_neo4j import xlsf_to_neo4j
from data_to_neo4j.ppt_to_neo4j import pptf_to_neo4j
from input_to_json.ppt_to_json import pptf_to_json
from input_to_json.xsl_to_json import xlsf_to_json

if __name__ == "__main__" :

    graph = Graph("neo4j://localhost:7687", auth=("neo4j", "Zzy12802@"))
    graph.delete_all()

    #知识抽取

    #提取json文件
    folder_path = "data/课件"#"课件"文件夹
    out_path = "data/课件(json)"
    pptf_to_json(folder_path,out_path)
    folder_path = "data/试卷库(excel)"#"试卷库(excel)"文件夹
    out_path = "data/试卷库(json)"
    xlsf_to_json(folder_path, out_path)
    folder_path = "data/作业库(excel)"#"作业库(excel)"文件夹
    out_path = "data/作业库(json)"
    xlsf_to_json(folder_path, out_path)

    #利用模型将json数据集转换为json格式的知识点储存在data


    #知识图谱1：简单问题关系的知识图谱
    folder_path = "data/作业库(excel)"
    xlsf_to_neo4j(folder_path,graph)
    folder_path = "data/试卷库(excel)"
    xlsf_to_neo4j(folder_path, graph)
    folder_path = "data/课件"
    pptf_to_neo4j(folder_path, graph)

    #知识图谱2：复杂的知识抽取的知识图谱

