import os

import pandas
import pandas as pd
import json
import string
import re


def xlsf_to_json(folder_path,out_path):
    # 获取文件夹下所有文件名
    files_in_folder = os.listdir(folder_path)
    folder_name = os.path.basename(folder_path)
    # 遍历并输出每个文件的完整路径
    for file in files_in_folder:
        ppt_path = os.path.join(folder_path, file)
        json_filename = os.path.splitext(file)[0] + ".json" # 替换为你想要输出的JSON文件路径
        json_path=os.path.join(out_path, json_filename)
        xls_to_json(ppt_path,json_path)
def replace_consecutive_underscores(s):
    # 使用正则表达式匹配连续的两个或更多的下划线
    new_s = re.sub(r'_{2,}', '_', s)
    return new_s
def xls_to_json(xls_path, json_path):
    """
    将XLS文件中的内容提取并保存为JSON格式。

    参数:
    xls_path: str
        XLS文件的路径。
    json_path: str
        输出的JSON文件的路径。
    """
    # 读取XLS文件
    df = pd.read_excel(xls_path)

    row_text=[]
    for index, row in df.iterrows():
        big_question = str(row['大题题干'])
        if pandas.isnull(row['小题题干']):
            question_text = big_question + '?'
        else:
            small_question = str(row['小题题干'])
            question_text = big_question + '?' + small_question + '?'


        answers_text = ''
        if pd.isnull(row['正确答案'])==False:
            answer_option = str(row['正确答案'])
            for op in answer_option:
                if(op>='A' and op<='Z'):
                    answers_text += str(row[f'选项{op}']) + ';'
        else:
            for op in  range(ord('A'), ord('Z')+1):
                if pd.isnull(row[f'选项{chr(op)}'])==False:
                    answers_text += str(row[f'选项{chr(op)}']) + ';'



        answers_text = answers_text.strip().replace('\n', '').replace(' ', '')
        question_text = replace_consecutive_underscores(question_text.strip().replace('\n', '').replace(' ', ''))
        row_content={
            "text": f"题干内容: {question_text}选项答案:{answers_text}"
        }
        row_text.append(row_content)
    with open(json_path, "w", encoding="utf-8") as json_file:
        json.dump(row_text, json_file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
# 使用示例
    xls_path = "混合式考试线上部分.xls"  # 替换为你的XLS文件路径
    json_path = "output2.json"  # 替换为你想要输出的JSON文件路径
    xls_to_json(xls_path, json_path)
