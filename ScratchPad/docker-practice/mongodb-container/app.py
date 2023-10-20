import os
from dotenv import load_dotenv
from flask import Flask

# Load .env file
load_dotenv()

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, Docker!"

if __name__ == '__main__':
    print(os.environ.get('FLASK_RUN_HOST', '0.0.0.0'), '<--- host')
    app.run(host=os.environ.get('FLASK_RUN_HOST'), port=5000)
