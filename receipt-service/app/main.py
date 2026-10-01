from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.ocr import extract_receipt_data
from app.models import ReceiptData

app = FastAPI(title="Receipt Processing Service")

# Allow your Node backend / React frontend to call this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict this in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "Receipt service is running"}

@app.post("/process-receipt", response_model=ReceiptData)
async def process_receipt(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    image_bytes = await file.read()
    result = extract_receipt_data(image_bytes)
    return result