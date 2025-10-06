from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Sammy Sparkle Models
class EmailSubscription(BaseModel):
    email: EmailStr

class EmailSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    source: str = "viral_hooks_checklist"
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "active"

class PurchaseRequest(BaseModel):
    product: str
    price: float
    customer_email: Optional[str] = "sammy.sparkleee@gmail.com"

class Purchase(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_email: str
    product_name: str
    price: float
    transaction_id: str = Field(default_factory=lambda: "TXN_" + str(uuid.uuid4())[:8].upper())
    purchased_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "completed"

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Email notification function
async def send_notification_email(subject: str, body: str, to_email: str = "sammy.sparkleee@gmail.com"):
    """Send email notifications (mock implementation for now)"""
    try:
        # For now, just log the email content
        logger.info(f"📧 EMAIL NOTIFICATION:")
        logger.info(f"To: {to_email}")
        logger.info(f"Subject: {subject}")
        logger.info(f"Body: {body}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

# Sammy Sparkle API Endpoints
@api_router.post("/subscribe")
async def subscribe_email(subscription: EmailSubscription):
    """Handle email subscriptions for free viral hook checklist"""
    try:
        # Check if email already exists
        existing = await db.subscribers.find_one({"email": subscription.email})
        if existing:
            return {
                "success": True,
                "message": "You're already subscribed! Check your email for the checklist.",
                "subscriber_id": existing["id"]
            }
        
        # Create new subscription
        subscriber = EmailSubscriber(email=subscription.email)
        result = await db.subscribers.insert_one(subscriber.dict())
        
        # Send notification to Sammy
        await send_notification_email(
            subject="🎉 New Subscriber - Free Viral Hook Checklist",
            body=f"New subscriber: {subscription.email}\nSource: Free Viral Hook Checklist\nTime: {datetime.utcnow()}"
        )
        
        logger.info(f"New email subscription: {subscription.email}")
        
        return {
            "success": True,
            "message": "Successfully subscribed! Check your email for the free checklist.",
            "subscriber_id": subscriber.id
        }
        
    except Exception as e:
        logger.error(f"Subscription error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process subscription")

@api_router.post("/purchase")
async def purchase_ebook(purchase_request: PurchaseRequest):
    """Handle eBook purchases"""
    try:
        # Create purchase record
        purchase = Purchase(
            customer_email=purchase_request.customer_email,
            product_name=purchase_request.product,
            price=purchase_request.price
        )
        
        result = await db.purchases.insert_one(purchase.dict())
        
        # Send notification to Sammy about the purchase
        await send_notification_email(
            subject="💰 New eBook Purchase - TikTok 150K Playbook",
            body=f"""New purchase details:
            
Product: {purchase.product_name}
Price: ${purchase.price} AUD
Customer Email: {purchase.customer_email}
Transaction ID: {purchase.transaction_id}
Purchase Time: {purchase.purchased_at}

Please send the eBook to the customer's email address.
            """,
            to_email="sammy.sparkleee@gmail.com"
        )
        
        logger.info(f"New purchase: {purchase.product_name} by {purchase.customer_email}")
        
        return {
            "success": True,
            "message": "Purchase successful! Check your email for download instructions.",
            "transaction_id": purchase.transaction_id
        }
        
    except Exception as e:
        logger.error(f"Purchase error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process purchase")

# Get subscribers (for Sammy to view)
@api_router.get("/subscribers")
async def get_subscribers():
    """Get all email subscribers"""
    try:
        subscribers = await db.subscribers.find().to_list(1000)
        # Convert ObjectId to string for JSON serialization
        for subscriber in subscribers:
            subscriber["_id"] = str(subscriber["_id"])
        
        return {
            "success": True,
            "count": len(subscribers),
            "subscribers": subscribers
        }
    except Exception as e:
        logger.error(f"Error fetching subscribers: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch subscribers")

# Get purchases (for Sammy to view)
@api_router.get("/purchases") 
async def get_purchases():
    """Get all purchases"""
    try:
        purchases = await db.purchases.find().to_list(1000)
        # Convert ObjectId to string for JSON serialization
        for purchase in purchases:
            purchase["_id"] = str(purchase["_id"])
        
        return {
            "success": True,
            "count": len(purchases),
            "purchases": purchases
        }
    except Exception as e:
        logger.error(f"Error fetching purchases: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch purchases")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
