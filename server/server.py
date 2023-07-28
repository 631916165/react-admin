import secrets
from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename





app = Flask(__name__)
CORS(app)

# 保存上传的文件的目录
UPLOAD_FOLDER = 'upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# 连接到MySQL数据库
conn = pymysql.connect(
host='127.0.0.1',
    user='root',
    password='123456',
    database='admin',
    cursorclass=pymysql.cursors.DictCursor
)

conn2 = pymysql.connect(
host='127.0.0.1',
    user='root',
    password='123456',
    database='blog_db',
    cursorclass=pymysql.cursors.DictCursor
)
# 创建数据库游标
cursor = conn.cursor()
cursor2 = conn2.cursor()



#验证传上来的文件类型 ok
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


#登录功能api ok
@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    # username = data['username']
    # password = data['password']
    print(username)
    print(password)

    query = "SELECT * FROM user WHERE username = %s AND password = %s"
    #执行sql语句
    cursor.execute(query,(username, password))
    print(query)
    result = cursor.fetchone()
    print(result)

    if result:
        # 验证成功
        #生成token
        token = secrets.token_hex(16) + username
        return jsonify({'success': True , 'token':token})
    else:
        # 验证失败
        return jsonify({'success': False})


#上传后保存图片api ok
@app.route('/api/upload', methods=['POST'])
def upload_file():
    # 检查是否有文件被上传
    if 'file' not in request.files:
        return jsonify({'error': '未找到上传的文件'}), 400

    file = request.files['file']

    # 检查文件是否存在
    if file.filename == '':
        return jsonify({'error': '未选择文件'}), 400

    # 保存上传的文件到指定目录
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'message': '文件上传成功'}), 200
    else:
        return jsonify({'message':'不合规的文件类型'}),400


#发布文章ok
@app.route('/api/save_article',methods=['POST'])
def save_article():
    #获取要存储的信息
    data = request.get_json()
    title = data.get('title')
    author = data.get('author')
    content = data.get('content')

    query = 'SELECT * FROM articles'
    cursor2.execute(query)
    articles = cursor2.fetchall()
    ids = str(len(articles)+1)

    values = (ids, title, author, content)
    print(values)
    if values:
        #插入文章数据到数据库中
        query = "INSERT INTO articles (id,title,author,content) VALUE (%s,%s,%s,%s)"
        cursor2.execute(query,values)
        conn2.commit()

        return jsonify({'message':'文章保存成功！'})
    else:
        return jsonify({'message':'文章上传失败！'})



#读取文章
@app.route('/api/get_article',methods=['GET'])
def get_article():
    try:
        # 查询数据库所有文章
        query = 'SELECT * FROM articles'
        cursor2.execute(query)
        articles = cursor2.fetchall()
        print("1",articles)
        return jsonify(articles)
    except Exception as e:
        return jsonify({'error': '获取文章数据失败'}), 500



#删除文章
@app.route('/api/shan/<int:article_id>',methods=['DELETE'])
def shan(article_id):
    try:
        query = 'DELETE FROM articles WHERE id = %s'
        cursor2.execute(query,article_id)
        conn2.commit()
        return jsonify({'message':'删除成功！'})
    except:
        return jsonify({'message':'删除失败'})


#修改文章
@app.route('/api/xiu/<int:article_id>',methods=['PUT'])
def xiu(article_id):
    data = request.get_json()
    print(data)
    # 查询文章是否存在
    query = 'SELECT * FROM articles WHERE id = %s'
    cursor2.execute(query, (article_id,))
    article = cursor2.fetchone()

    if article:
        # 更新文章信息
        update_query = 'UPDATE articles SET title = %s, author = %s, content = %s WHERE id = %s'
        cursor2.execute(update_query,(data.get('title'), data.get('author'), data.get('content'), article_id))
        conn2.commit()
        return jsonify({'message': '修改成功'}), 200
    else:
        return jsonify({'message': '未找到该文章'}), 404

if __name__ == '__main__':
    app.run()
