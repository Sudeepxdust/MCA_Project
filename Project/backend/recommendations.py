def get_recommendations(data, carbon, water):
    suggestions = []

    # Electricity
    if data.get("electricity", 0) > 100:
        suggestions.append("Reduce electricity usage, switch to LED bulbs")

    # Fuel
    if data.get("petrol", 0) > 20:
        suggestions.append("Use public transport or carpool")

    # LPG
    if data.get("lpg", 0) > 10:
        suggestions.append("Optimize cooking methods to save gas")

    # Water-heavy food
    if data.get("rice", 0) > 5:
        suggestions.append("Reduce rice consumption (high water footprint)")

    if data.get("chicken", 0) > 3:
        suggestions.append("Try plant-based alternatives occasionally")

    # General
    if carbon["total_co2"] < 20:
        suggestions.append("Great job! Your carbon footprint is low 🌱")

    return suggestions