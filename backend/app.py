from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder="static")
CORS(app)

@app.route('/upload-scan', methods=['POST'])
def upload_scan():
    response = {
        'annotated_image': 'sample-annotated.png',
        'report_text': 'A dummy kidney stone is detected in the right kidney. Size: 4mm.',
        'voice_mp3': 'sample-voice.mp3',
        'pdf_report': 'sample-report.pdf'
    }
    return jsonify(response)

# Route to serve static files
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory("static", filename)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
