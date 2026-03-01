from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI(title="Green Energy Marketplace API")

# ✅ CORS FIX (VERY IMPORTANT — your error was here)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hackathon ke liye ok
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# 📦 MODELS
# =========================

class Listing(BaseModel):
    seller_name: str
    energy_type: str
    city: str
    price_per_unit: float
    available_kwh: int


class MatchRequest(BaseModel):
    city: str
    energy_type: str


# =========================
# 🧠 FAKE DATABASE (RAM)
# =========================

listings_db: List[dict] = [
    {
        "id": str(uuid.uuid4()),
        "seller_name": "Harman Solar",
        "energy_type": "solar",
        "city": "indore",
        "price_per_unit": 4.5,
        "available_kwh": 5000,
    },
    {
        "id": str(uuid.uuid4()),
        "seller_name": "Green Wind Ltd",
        "energy_type": "wind",
        "city": "mumbai",
        "price_per_unit": 5.2,
        "available_kwh": 8000,
    },
]


# =========================
# 🚀 ROUTES
# =========================

@app.get("/")
def root():
    return {"message": "GreenGrid API running 🚀"}


# ✅ Create listing
@app.post("/listings/create")
def create_listing(listing: Listing):
    new_item = listing.dict()
    new_item["id"] = str(uuid.uuid4())
    listings_db.append(new_item)
    return {"message": "Listing created", "data": new_item}


# ✅ Get all listings
@app.get("/listings/all")
def get_all_listings():
    return {"listings": listings_db}


# ✅ Match buyer with sellers
@app.post("/match")
def match_energy(req: MatchRequest):
    matches = [
        l for l in listings_db
        if l["city"].lower() == req.city.lower()
        and l["energy_type"].lower() == req.energy_type.lower()
    ]

    # sort by cheapest
    matches.sort(key=lambda x: x["price_per_unit"])

    return {"matches": matches[:5]}  # top 5
    import os

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000)),
    )