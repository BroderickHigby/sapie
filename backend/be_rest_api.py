from flask import Flask, render_template, redirect, url_for,request
from flask import make_response
from flask.json import jsonify
from influencer import *
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "hi"

@app.route('/run_query', methods=['GET', 'POST'])
def run_query():
    print("in query")
    json_input = json.loads(request.data)
    query_result = Influencer.query(None)#Influencer.query(json_input['queryString'])
    print(query_result)
    print(type(query_result))
    print("returning query")
    return jsonify({'query_results': query_result})
if __name__ == "__main__":
    app.run(debug = True)