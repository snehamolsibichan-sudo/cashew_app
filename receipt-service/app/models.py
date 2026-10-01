from pydantic import BaseModel
from typing import Optional
class ReceiptData(BaseModel):
    merchant: Optional[str] = None
    amount: Optional[float] = None
    date: Optional[str] = None
    raw_text: Optional[str] = None