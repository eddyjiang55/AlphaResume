import jieba
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# 加载预训练的Word2Vec模型
model_path = 'word2vec_model\sgns.target.word-word.dynwin5.thr10.neg5.dim300.iter5'

embeddings_index = {}

try:
    with open(model_path, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            if i == 0:
                continue  # 跳过第一行
            values = line.split()
            word = values[0]
            coefs = np.asarray(values[1:], dtype='float32')
            embeddings_index[word] = coefs
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")

# 定义一个函数来计算句子的平均词向量
def sentence_vector(sentence, embeddings_index):
    words = jieba.lcut(sentence)
    word_vectors = [embeddings_index[word] for word in words if word in embeddings_index]
    if len(word_vectors) == 0:
        return np.zeros(next(iter(embeddings_index.values())).shape[0])
    vector = np.mean(word_vectors, axis=0)
    return vector

# 计算两个句子之间的相似度
def calculate_similarity(text1, text2, embeddings_index):
    vector1 = sentence_vector(text1, embeddings_index)
    vector2 = sentence_vector(text2, embeddings_index)
    similarity = cosine_similarity([vector1], [vector2])[0][0]
    return similarity

# 获取数据库中的岗位信息
database_positions = [
    "软件工程师",
    "后端开发工程师",
    "数据科学家",
    "前端开发工程师",
    "嵌入式系统工程师"
]

# 用户输入的岗位
user_input = "软件开发工程师"

# 计算用户输入与数据库中每个岗位的相似度
similarities = [(position, calculate_similarity(user_input, position, embeddings_index)) for position in database_positions]

# 找到相似度最高的岗位
most_similar_position, highest_similarity = max(similarities, key=lambda x: x[1])

# 设置阈值
threshold = 0.8

if highest_similarity > threshold:
    print(f"The user's input '{user_input}' is considered to match the position '{most_similar_position}' in the database with a similarity of {highest_similarity:.2f}.")
else:
    print(f"The user's input '{user_input}' does not match any position in the database closely enough (highest similarity: {highest_similarity:.2f}).")
