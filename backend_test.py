#!/usr/bin/env python3
"""
Backend API Testing for Sammy Sparkle's Personal Brand Website
Tests all backend API endpoints including email subscriptions, purchases, and admin endpoints.
"""

import requests
import json
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://creator-journey-5.preview.emergentagent.com')
API_BASE = f"{BACKEND_URL}/api"

print(f"🚀 Testing Backend API at: {API_BASE}")
print("=" * 60)

class BackendTester:
    def __init__(self):
        self.test_results = {
            'passed': 0,
            'failed': 0,
            'errors': []
        }
        
    def log_result(self, test_name, success, message=""):
        if success:
            print(f"✅ {test_name}: PASSED {message}")
            self.test_results['passed'] += 1
        else:
            print(f"❌ {test_name}: FAILED {message}")
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"{test_name}: {message}")
    
    def test_root_endpoint(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_result("Root Endpoint", True, "- API is accessible")
                else:
                    self.log_result("Root Endpoint", False, f"- Unexpected response: {data}")
            else:
                self.log_result("Root Endpoint", False, f"- Status: {response.status_code}")
        except Exception as e:
            self.log_result("Root Endpoint", False, f"- Connection error: {str(e)}")
    
    def test_email_subscription_valid(self):
        """Test email subscription with valid email"""
        test_email = f"test.user.{uuid.uuid4().hex[:8]}@example.com"
        payload = {"email": test_email}
        
        try:
            response = requests.post(f"{API_BASE}/subscribe", json=payload, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'subscriber_id' in data:
                    self.log_result("Email Subscription (Valid)", True, f"- Email: {test_email}")
                else:
                    self.log_result("Email Subscription (Valid)", False, f"- Response: {data}")
            else:
                self.log_result("Email Subscription (Valid)", False, f"- Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("Email Subscription (Valid)", False, f"- Error: {str(e)}")
    
    def test_email_subscription_duplicate(self):
        """Test duplicate email subscription handling"""
        test_email = f"duplicate.test.{uuid.uuid4().hex[:8]}@example.com"
        payload = {"email": test_email}
        
        try:
            # First subscription
            response1 = requests.post(f"{API_BASE}/subscribe", json=payload, timeout=10)
            # Second subscription (duplicate)
            response2 = requests.post(f"{API_BASE}/subscribe", json=payload, timeout=10)
            
            if response1.status_code == 200 and response2.status_code == 200:
                data1 = response1.json()
                data2 = response2.json()
                
                if (data1.get('success') and data2.get('success') and 
                    'already subscribed' in data2.get('message', '').lower()):
                    self.log_result("Email Subscription (Duplicate)", True, "- Duplicate handling works")
                else:
                    self.log_result("Email Subscription (Duplicate)", False, f"- Response2: {data2}")
            else:
                self.log_result("Email Subscription (Duplicate)", False, 
                              f"- Status1: {response1.status_code}, Status2: {response2.status_code}")
        except Exception as e:
            self.log_result("Email Subscription (Duplicate)", False, f"- Error: {str(e)}")
    
    def test_email_subscription_invalid(self):
        """Test email subscription with invalid email format"""
        invalid_emails = ["invalid-email", "test@", "@example.com", ""]
        
        for invalid_email in invalid_emails:
            payload = {"email": invalid_email}
            try:
                response = requests.post(f"{API_BASE}/subscribe", json=payload, timeout=10)
                if response.status_code == 422:  # FastAPI validation error
                    self.log_result(f"Email Subscription (Invalid: {invalid_email})", True, "- Validation works")
                else:
                    self.log_result(f"Email Subscription (Invalid: {invalid_email})", False, 
                                  f"- Expected 422, got {response.status_code}")
            except Exception as e:
                self.log_result(f"Email Subscription (Invalid: {invalid_email})", False, f"- Error: {str(e)}")
    
    def test_ebook_purchase_success(self):
        """Test successful eBook purchase"""
        test_email = f"buyer.{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "product": "TikTok 150K Playbook",
            "price": 29.99,
            "customer_email": test_email
        }
        
        try:
            response = requests.post(f"{API_BASE}/purchase", json=payload, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if (data.get('success') and 'transaction_id' in data and 
                    data['transaction_id'].startswith('TXN_')):
                    self.log_result("eBook Purchase (Success)", True, 
                                  f"- Transaction ID: {data['transaction_id']}")
                else:
                    self.log_result("eBook Purchase (Success)", False, f"- Response: {data}")
            else:
                self.log_result("eBook Purchase (Success)", False, 
                              f"- Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("eBook Purchase (Success)", False, f"- Error: {str(e)}")
    
    def test_ebook_purchase_default_email(self):
        """Test eBook purchase with default email (sammy.sparkleee@gmail.com)"""
        payload = {
            "product": "TikTok 150K Playbook",
            "price": 29.99
        }
        
        try:
            response = requests.post(f"{API_BASE}/purchase", json=payload, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'transaction_id' in data:
                    self.log_result("eBook Purchase (Default Email)", True, 
                                  f"- Uses sammy.sparkleee@gmail.com by default")
                else:
                    self.log_result("eBook Purchase (Default Email)", False, f"- Response: {data}")
            else:
                self.log_result("eBook Purchase (Default Email)", False, 
                              f"- Status: {response.status_code}")
        except Exception as e:
            self.log_result("eBook Purchase (Default Email)", False, f"- Error: {str(e)}")
    
    def test_get_subscribers_admin(self):
        """Test admin endpoint to get all subscribers"""
        try:
            response = requests.get(f"{API_BASE}/subscribers", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if (data.get('success') and 'subscribers' in data and 
                    isinstance(data['subscribers'], list)):
                    self.log_result("Admin - Get Subscribers", True, 
                                  f"- Found {data.get('count', 0)} subscribers")
                else:
                    self.log_result("Admin - Get Subscribers", False, f"- Response: {data}")
            else:
                self.log_result("Admin - Get Subscribers", False, 
                              f"- Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("Admin - Get Subscribers", False, f"- Error: {str(e)}")
    
    def test_get_purchases_admin(self):
        """Test admin endpoint to get all purchases"""
        try:
            response = requests.get(f"{API_BASE}/purchases", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if (data.get('success') and 'purchases' in data and 
                    isinstance(data['purchases'], list)):
                    self.log_result("Admin - Get Purchases", True, 
                                  f"- Found {data.get('count', 0)} purchases")
                else:
                    self.log_result("Admin - Get Purchases", False, f"- Response: {data}")
            else:
                self.log_result("Admin - Get Purchases", False, 
                              f"- Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("Admin - Get Purchases", False, f"- Error: {str(e)}")
    
    def test_invalid_endpoints(self):
        """Test error handling for invalid endpoints"""
        invalid_endpoints = [
            "/api/nonexistent",
            "/api/subscribe/invalid",
            "/api/purchase/invalid"
        ]
        
        for endpoint in invalid_endpoints:
            try:
                response = requests.get(f"{BACKEND_URL}{endpoint}", timeout=10)
                if response.status_code == 404:
                    self.log_result(f"Error Handling ({endpoint})", True, "- Returns 404 for invalid endpoint")
                else:
                    self.log_result(f"Error Handling ({endpoint})", False, 
                                  f"- Expected 404, got {response.status_code}")
            except Exception as e:
                self.log_result(f"Error Handling ({endpoint})", False, f"- Error: {str(e)}")
    
    def test_invalid_payloads(self):
        """Test API validation with invalid payloads"""
        # Test subscribe with missing email
        try:
            response = requests.post(f"{API_BASE}/subscribe", json={}, timeout=10)
            if response.status_code == 422:
                self.log_result("Invalid Payload - Subscribe (Missing Email)", True, "- Validation works")
            else:
                self.log_result("Invalid Payload - Subscribe (Missing Email)", False, 
                              f"- Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_result("Invalid Payload - Subscribe (Missing Email)", False, f"- Error: {str(e)}")
        
        # Test purchase with missing required fields
        try:
            response = requests.post(f"{API_BASE}/purchase", json={"product": "test"}, timeout=10)
            if response.status_code == 422:
                self.log_result("Invalid Payload - Purchase (Missing Price)", True, "- Validation works")
            else:
                self.log_result("Invalid Payload - Purchase (Missing Price)", False, 
                              f"- Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_result("Invalid Payload - Purchase (Missing Price)", False, f"- Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("🧪 Starting Backend API Tests...")
        print()
        
        # Basic connectivity
        self.test_root_endpoint()
        print()
        
        # Email subscription tests
        print("📧 Testing Email Subscription API...")
        self.test_email_subscription_valid()
        self.test_email_subscription_duplicate()
        self.test_email_subscription_invalid()
        print()
        
        # Purchase tests
        print("💰 Testing eBook Purchase API...")
        self.test_ebook_purchase_success()
        self.test_ebook_purchase_default_email()
        print()
        
        # Admin endpoints
        print("👨‍💼 Testing Admin Endpoints...")
        self.test_get_subscribers_admin()
        self.test_get_purchases_admin()
        print()
        
        # Error handling
        print("🚨 Testing Error Handling...")
        self.test_invalid_endpoints()
        self.test_invalid_payloads()
        print()
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.test_results['passed']}")
        print(f"❌ Failed: {self.test_results['failed']}")
        print(f"📈 Success Rate: {(self.test_results['passed'] / (self.test_results['passed'] + self.test_results['failed']) * 100):.1f}%")
        
        if self.test_results['errors']:
            print("\n🔍 FAILED TESTS:")
            for error in self.test_results['errors']:
                print(f"  • {error}")
        
        print("\n📝 NOTES:")
        print("  • Email notifications are mocked (logged to console)")
        print("  • All data is stored in MongoDB collections: subscribers, purchases")
        print("  • Transaction IDs are auto-generated with TXN_ prefix")
        print("  • Duplicate email subscriptions are handled gracefully")
        
        return self.test_results['failed'] == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! Backend API is working correctly.")
        exit(0)
    else:
        print(f"\n⚠️  {tester.test_results['failed']} test(s) failed. Please check the issues above.")
        exit(1)