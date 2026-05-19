def calculate_water(data):
    rice = data.get("rice", 0)
    wheat = data.get("wheat", 0)
    chicken = data.get("chicken", 0)
    veg = data.get("veg", 0)

    water = (
        rice * 2500 +
        wheat * 1600 +
        chicken * 4300 +
        veg * 300
    )

    return round(water, 2)