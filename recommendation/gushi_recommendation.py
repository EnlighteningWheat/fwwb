import numpy as np
import pandas


class item_similarity_recommender_py():
    def __init__(self):
        self.train_data = None
        self.user_id = None
        self.item_id = None
        self.cooccurence_matrix = None
        self.songs_dict = None
        self.rev_songs_dict = None
        self.item_similarity_recommendations = None

    def get_user_items(self, user):  # 获取该用户访问过的词条————一维
        user_data = self.train_data[self.train_data[self.user_id] == user]
        user_items = list(user_data[self.item_id].unique())

        return user_items

    def get_item_users(self, item):  # 获取访问过该词条的用户————一维
        item_data = self.train_data[self.train_data[self.item_id] == item]
        item_users = set(item_data[self.user_id].unique())

        return item_users

    def get_all_items_train_data(self):  # 获取全部的词条————一维
        all_items = list(self.train_data[self.item_id].unique())
        return all_items

    def construct_cooccurence_matrix(self, user_songs, all_songs):

        user_songs_users = []
        for i in range(0, len(user_songs)):  # 将全部词条的自己用户提取————二维
            user_songs_users.append(self.get_item_users(user_songs[i]))

        cooccurence_matrix = np.matrix(np.zeros(shape=(len(user_songs), len(all_songs))), float)  # 预先构造二维目标矩阵

        for i in range(0, len(all_songs)):
            songs_i_data = self.train_data[self.train_data[self.item_id] == all_songs[i]]
            users_i = set(songs_i_data[self.user_id].unique())  # 获取这首词条的所有用户

            for j in range(0, len(user_songs)):

                users_j = user_songs_users[j]  # 获取这首词条的所有用户(此歌为用户听过的歌)

                users_intersection = users_i.intersection(users_j)  # 计算用户交集

                if len(users_intersection) != 0:
                    users_union = users_i.union(users_j)  # 计算用户并集

                    cooccurence_matrix[j, i] = float(len(users_intersection)) / float(len(users_union))  # 得出相似度
                else:
                    cooccurence_matrix[j, i] = 0

        return cooccurence_matrix

    def generate_top_recommendations(self, user, cooccurence_matrix, all_songs, user_songs):
        print("Non zero values in cooccurence_matrix :%d" % np.count_nonzero(cooccurence_matrix))

        user_sim_scores = cooccurence_matrix.sum(axis=0) / float(cooccurence_matrix.shape[0])
        user_sim_scores = np.array(user_sim_scores)[0].tolist()  # 对列求和求平均，求出推荐度

        sort_index = sorted(((e, i) for i, e in enumerate(list(user_sim_scores))), reverse=True)  # 降序排序

        columns = ['user_id', 'song', 'score', 'rank']

        df = pandas.DataFrame(columns=columns)

        rank = 1
        for i in range(0, len(sort_index)):  # 获取推荐列表取前三
            if ~np.isnan(sort_index[i][0]) and all_songs[sort_index[i][1]] not in user_songs and rank <= 3:
                df.loc[len(df)] = [user, all_songs[sort_index[i][1]], sort_index[i][0], rank]
                rank = rank + 1

        if df.shape[0] == 0:
            print("The current user has no songs for training the item similarity based recommendation model.")
            return -1
        else:
            return df

    def create(self, train_data, user_id, item_id):
        self.train_data = train_data
        self.user_id = user_id
        self.item_id = item_id

    def recommend(self, user):  # 推荐词条

        user_songs = self.get_user_items(user)

        print("No. of unique songs for the user: %d" % len(user_songs))

        all_songs = self.get_all_items_train_data()

        print("no. of unique songs in the training set: %d" % len(all_songs))

        cooccurence_matrix = self.construct_cooccurence_matrix(user_songs, all_songs)

        df_recommendations = self.generate_top_recommendations(user, cooccurence_matrix, all_songs, user_songs)

        return df_recommendations

    # Get similar items to given items
    def get_similar_items(self, item_list):  # 获取相似词条

        user_songs = item_list
        all_songs = self.get_all_items_train_data()
        print("no. of unique songs in the training set: %d" % len(all_songs))
        cooccurence_matrix = self.construct_cooccurence_matrix(user_songs, all_songs)
        user = ""
        df_recommendations = self.generate_top_recommendations(user, cooccurence_matrix, all_songs, user_songs)

        return df_recommendations