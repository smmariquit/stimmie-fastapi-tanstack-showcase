from fastapi import FastAPI
from pydantic import BaseModel
import time
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="TanStack Showcase API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    id: int
    name: str

# In-memory database
db = [{"id": 1, "name": "Learn TanStack Query"}, {"id": 2, "name": "Build FastAPI Backend"}]

@app.get("/items")
def get_items():
    time.sleep(1.5) # Simulate network latency
    return db

@app.post("/items")
def create_item(item: Item):
    time.sleep(1) # Simulate network latency
    db.append(item.dict())
    return {"status": "success", "item": item}
