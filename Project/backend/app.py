from flask import Flask, request, jsonify
from flask_cors import CORS

from carbon import calculate_carbon
from water import calculate_water
from analysis import category_analysis
from recommendations import get_recommendations

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "🌍 Energy Footprint API is running!"

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()

    carbon_result = calculate_carbon(data)
    water_result = calculate_water(data)
    analysis_result = category_analysis(carbon_result, water_result)
    suggestions = get_recommendations(data, carbon_result, water_result)

    return jsonify({
        "carbon": carbon_result,
        "water": water_result,
        "analysis": analysis_result,
        "suggestions": suggestions
    })

if __name__ == '__main__':
    app.run(debug=True)