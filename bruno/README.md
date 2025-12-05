# Bruno API Collection

Yeh Bruno collection Zoho webhooks ko test karne ke liye setup ki gayi hai.

## Setup Instructions

1. **Bruno Install karein:**
   - Bruno download karein: https://www.usebruno.com/
   - Ya VS Code extension install karein: Bruno API Client

2. **Collection Open karein:**
   - Bruno desktop app ya VS Code extension mein:
     - `bruno/zoho-webhooks` folder ko open karein (yeh collection folder hai)
     - Ya `bruno` folder ko open karein (parent collection)
   - **Note:** `bruno.json` file ab dono jagah available hai

3. **Environment Variables Set karein:**
   - `bruno/environments/` folder mein environment files hain:
     - `local.bru` - Local development ke liye
     - `production.bru` - Production ke liye
     - `staging.bru` - Staging ke liye
   - Environment file mein apne values update karein:
     - `base_url`: Apna server URL (default: http://localhost:3000)
     - `webhook_key`: Apna webhook key (environment variable se match karein)
     - `origin`: Origin header value (default: https://zoho.com)
     - `port`: Server port number

## Available Requests

### 1. Receive Zoho Webhook

- **URL:** `POST /webhooks/zoho`
- **Description:** General Zoho webhook receive karne ke liye
- **Headers:**
  - `x-webhook-key`: Webhook authentication key
  - `origin`: https://zoho.com

### 2. Receive Summit Webhook

- **URL:** `POST /webhooks/zoho/summit`
- **Description:** Summit-specific webhook receive karne ke liye
- **Headers:** Same as above

### 3. Test Invalid Key

- **Description:** Invalid webhook key ke saath test karein (401 error expect karein)

### 4. Test Invalid Domain

- **Description:** Invalid domain ke saath test karein (403 error expect karein)

## Environment Variables

Apne `.env` file mein ye set karein:

```
WEBHOOK_KEY=your-secret-key-here
# ya
ZOHO_WEBHOOK_KEY=your-secret-key-here
```

Phir `bruno/environments/local.bru` file mein same key ko `webhook_key` variable mein set karein.

## Usage

1. Server start karein: `yarn start:dev`
2. Bruno collection open karein (`bruno` folder)
3. Environment select karein:
   - Bruno mein top bar mein environment dropdown se `local`, `production`, ya `staging` select karein
   - Ya `bruno/environments/` folder se environment file select karein
4. Request select karein aur "Send" click karein

## Notes

- Domain restriction ke liye `origin` header `zoho.com`, `zoho.in`, ya `zoho.eu` hona chahiye
- Webhook key header mein `x-webhook-key` ya `webhook-key` ke through bhej sakte hain
- Query parameter ya body mein bhi `key` field use kar sakte hain
