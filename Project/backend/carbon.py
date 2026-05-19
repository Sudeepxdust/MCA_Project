def calculate_carbon(data):
    electricity = data.get("electricity", 0)
    petrol = data.get("petrol", 0)
    diesel = data.get("diesel", 0)
    lpg = data.get("lpg", 0)

    energy = electricity * 0.82
    transport = petrol * 2.31 + diesel * 2.68
    household = lpg * 1.51

    total_co2 = energy + transport + household

    return {
        "energy": round(energy, 2),
        "transport": round(transport, 2),
        "household": round(household, 2),
        "total_co2": round(total_co2, 2)
    }