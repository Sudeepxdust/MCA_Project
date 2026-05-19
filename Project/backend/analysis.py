def category_analysis(carbon_data, water_value):
    return {
        "Energy Impact (CO2)": carbon_data["energy"],
        "Transport Impact (CO2)": carbon_data["transport"],
        "Household Impact (CO2)": carbon_data["household"],
        "Water Footprint (Liters)": water_value
    }