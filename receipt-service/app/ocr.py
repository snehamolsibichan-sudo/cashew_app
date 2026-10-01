from app.models import ReceiptData


def extract_receipt_data(image_bytes: bytes) -> ReceiptData:
    """
    Stub implementation. Returns fake-but-plausible data so we can
    build and test the full pipeline before adding real OCR.
    """
    return ReceiptData(
        merchant="Sample Store",
        amount=23.45,
        date="2026-09-25",
        raw_text="SAMPLE STORE\nTOTAL: $23.45\nDATE: 2026-09-25"
    )