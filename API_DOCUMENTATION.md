# NPS Retirement Tool - API Documentation

## Base URL
- Development: `http://localhost:5000`
- Production: `https://your-deployed-backend.com`

## Authentication
- Use JWT tokens in Authorization header
- Format: `Authorization: Bearer <token>`

---

## 📌 User Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

---

### 2. Login User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

---

### 3. Get User Profile
**Endpoint:** `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-02-21T10:00:00Z"
  }
}
```

---

## 📊 Calculator Endpoints

### 1. Calculate Retirement Forecast
**Endpoint:** `POST /api/calculator/calculate`

**Request Body:**
```json
{
  "currentAge": 30,
  "retirementAge": 60,
  "monthlyContribution": 10000,
  "expectedReturn": 10,
  "annuityReturn": 8
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Calculation completed successfully",
  "data": {
    "totalRetirementCorpus": 2345678.90,
    "lumpSum": 1407407.34,
    "monthlyPension": 46859.26,
    "annualPension": 562311.12,
    "yearsToRetirement": 30,
    "totalContribution": 3600000
  }
}
```

**Parameter Details:**
- `currentAge`: Integer, 18-75
- `retirementAge`: Integer, 30-80, must be > currentAge
- `monthlyContribution`: Number, >= 0
- `expectedReturn`: Percentage, 0-30
- `annuityReturn`: Percentage, 0-30

---

### 2. Estimate Required Contribution
**Endpoint:** `POST /api/calculator/estimate`

**Request Body:**
```json
{
  "desiredMonthlyPension": 50000,
  "currentAge": 30,
  "retirementAge": 60,
  "expectedReturn": 10,
  "annuityReturn": 8
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Contribution estimation completed",
  "data": {
    "desiredMonthlyPension": 50000,
    "requiredMonthlyContribution": 10678.45
  }
}
```

---

### 3. Get Scenario Comparison
**Endpoint:** `POST /api/calculator/scenario`

**Request Body:**
```json
{
  "currentAge": 30,
  "retirementAge": 60,
  "monthlyContribution": 10000,
  "annuityReturn": 8
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Scenario comparison completed",
  "data": {
    "conservative": {
      "totalRetirementCorpus": 1876543.21,
      "lumpSum": 1125925.93,
      "monthlyPension": 37531.62,
      "annualPension": 450379.48
    },
    "moderate": {
      "totalRetirementCorpus": 2345678.90,
      "lumpSum": 1407407.34,
      "monthlyPension": 46859.26,
      "annualPension": 562311.12
    },
    "aggressive": {
      "totalRetirementCorpus": 2956789.56,
      "lumpSum": 1774073.74,
      "monthlyPension": 59073.49,
      "annualPension": 708881.88
    }
  }
}
```

---

### 4. Save Forecast
**Endpoint:** `POST /api/calculator/save-forecast`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "forecastName": "My 2024 Plan",
  "currentAge": 30,
  "retirementAge": 60,
  "monthlyContribution": 10000,
  "expectedReturn": 10,
  "annuityReturn": 8
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Forecast saved successfully",
  "data": {
    "_id": "forecast_id",
    "userId": "user_id",
    "forecastName": "My 2024 Plan",
    "currentAge": 30,
    "retirementAge": 60,
    "monthlyContribution": 10000,
    "expectedReturn": 10,
    "annuityReturn": 8,
    "totalRetirementCorpus": 2345678.90,
    "lumpSum": 1407407.34,
    "annualPension": 562311.12,
    "monthlyPension": 46859.26,
    "createdAt": "2024-02-21T10:00:00Z"
  }
}
```

---

### 5. Get User's Forecasts
**Endpoint:** `GET /api/calculator/forecasts`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "forecast_id_1",
      "forecastName": "Plan A",
      "totalRetirementCorpus": 2345678.90,
      "monthlyPension": 46859.26,
      "createdAt": "2024-02-21T10:00:00Z"
    },
    {
      "_id": "forecast_id_2",
      "forecastName": "Plan B",
      "totalRetirementCorpus": 3456789.12,
      "monthlyPension": 58723.45,
      "createdAt": "2024-02-20T10:00:00Z"
    }
  ]
}
```

---

### 6. Get Specific Forecast
**Endpoint:** `GET /api/calculator/forecasts/:forecastId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "forecast_id",
    "userId": "user_id",
    "forecastName": "My Plan",
    "currentAge": 30,
    "retirementAge": 60,
    "monthlyContribution": 10000,
    "expectedReturn": 10,
    "annuityReturn": 8,
    "totalRetirementCorpus": 2345678.90,
    "lumpSum": 1407407.34,
    "annualPension": 562311.12,
    "monthlyPension": 46859.26,
    "createdAt": "2024-02-21T10:00:00Z",
    "updatedAt": "2024-02-21T10:00:00Z"
  }
}
```

---

### 7. Delete Forecast
**Endpoint:** `DELETE /api/calculator/forecasts/:forecastId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Forecast deleted successfully"
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided" / "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Forecast not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 🧪 Example Requests with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Calculate Retirement
```bash
curl -X POST http://localhost:5000/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "currentAge": 30,
    "retirementAge": 60,
    "monthlyContribution": 10000,
    "expectedReturn": 10,
    "annuityReturn": 8
  }'
```

### Save Forecast (with token)
```bash
curl -X POST http://localhost:5000/api/calculator/save-forecast \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_jwt_token_here" \
  -d '{
    "forecastName": "My Retirement Plan",
    "currentAge": 30,
    "retirementAge": 60,
    "monthlyContribution": 10000,
    "expectedReturn": 10,
    "annuityReturn": 8
  }'
```

### Get User Forecasts
```bash
curl -X GET http://localhost:5000/api/calculator/forecasts \
  -H "Authorization: Bearer your_jwt_token_here"
```

---

## 📋 Validation Rules

### Age
- currentAge: 18-75
- retirementAge: 30-80, must be > currentAge

### Contributions
- monthlyContribution: >= 0
- desiredMonthlyPension: > 0

### Returns
- expectedReturn: 0-30%
- annuityReturn: 0-30%

### Strings
- name: 1-100 characters
- email: valid email format
- password: minimum 8 characters
- forecastName: 1-100 characters

---

## 🔐 Authentication Flow

1. User registers → receives JWT token
2. Store token in localStorage
3. Include token in Authorization header for authenticated requests
4. Token expires after 7 days
5. On 401 response, user is logged out automatically

---

## 📊 Financial Formulas

### Retirement Corpus (FV Annuity)
```
FV = P × [((1 + r)^n - 1) / r]
Where:
  P = Monthly contribution
  r = Monthly interest rate
  n = Number of months
```

### Lump Sum (60% of corpus)
```
Lump Sum = Corpus × 0.6
```

### Annual Pension (40% of corpus at annuity rate)
```
Annual Pension = (Corpus × 0.4 × AnnuityRate) / 100
Monthly Pension = Annual Pension / 12
```

---

**Last Updated:** February 21, 2026
