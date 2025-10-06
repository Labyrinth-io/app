# Sammy Sparkle Website API Contracts

## Overview
Backend integration for Sammy Sparkle's personal brand website to handle email subscriptions and eBook purchases.

## Current Mock Data Integration
- **Email Collection**: `mockAPI.subscribeEmail()` in LeadMagnet.jsx
- **eBook Purchase**: `mockAPI.purchaseEbook()` in EbookShowcase.jsx
- **Toast Notifications**: Using shadcn sonner for user feedback

## Required API Endpoints

### 1. Email Subscription Endpoint
**Endpoint**: `POST /api/subscribe`
**Purpose**: Collect email addresses for free viral hook checklist

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully subscribed!",
  "subscriber_id": "unique_id"
}
```

**Frontend Integration**:
- File: `LeadMagnet.jsx`
- Function: `handleSubmit()`
- Current mock: `mockAPI.subscribeEmail(email)`

### 2. eBook Purchase Endpoint  
**Endpoint**: `POST /api/purchase`
**Purpose**: Handle eBook purchases with customer data

**Request Body**:
```json
{
  "product": "TikTok 150K Playbook",
  "price": 29,
  "customer_email": "sammy.sparkleee@gmail.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Purchase successful! Check your email for download link.",
  "transaction_id": "TXN_123456789"
}
```

**Frontend Integration**:
- File: `EbookShowcase.jsx` 
- Function: `handlePurchase()`
- Current mock: `mockAPI.purchaseEbook(customerData)`

## Database Models

### Subscribers Collection
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  source: String (default: "viral_hooks_checklist"),
  subscribed_at: DateTime,
  status: String (active/unsubscribed)
}
```

### Purchases Collection
```javascript
{
  _id: ObjectId,
  customer_email: String (required),
  product_name: String,
  price: Number,
  transaction_id: String (unique),
  purchased_at: DateTime,
  status: String (completed/pending/failed)
}
```

## Frontend Integration Steps
1. Replace `mockAPI.subscribeEmail()` with real API call to `/api/subscribe`
2. Replace `mockAPI.purchaseEbook()` with real API call to `/api/purchase`
3. Keep existing toast notification system
4. Maintain loading states and error handling

## Email Configuration
- **Target Email**: sammy.sparkleee@gmail.com
- **Notifications**: Send email confirmations for both subscriptions and purchases
- **Templates**: Simple text-based emails for now

## Error Handling
- Validation errors for invalid emails
- Duplicate subscription handling
- Purchase processing failures
- Network connectivity issues