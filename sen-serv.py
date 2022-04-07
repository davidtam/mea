from flask import Flask, request, jsonify
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

nltk.data.path.append('/app/nltk/')
app = Flask(__name__)
sia = SentimentIntensityAnalyzer()


@app.route('/api/get_sentiment', methods=['GET','POST'])
def get_sentiment():
    content = request.json
    print(f"{content=}")
    message = content["message"]

    scores = sia.polarity_scores(message)
    print(f"{scores=}")
    return jsonify(scores)


if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True)
