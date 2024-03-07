from flask import Flask, jsonify, request
from flask_cors import CORS
from functions import YouTubeComments
import time

app = Flask(__name__)
CORS(app)
start = time.time()

# /api/home
@app.route("/api/home",methods=['GET'])
def return_home():
    videoid = request.args.get('videoid')
    obj = YouTubeComments(videoid)
    obj.fetch_comments()
    end = time.time()
    print(end-start)
    return jsonify({
        'total_comments': obj.get_total_comments(),
        'unique_users': obj.get_unique_users(),
        "last_commented": obj.get_last_comment_time()
    })

if __name__ == "__main__":
    app.run(debug=True)