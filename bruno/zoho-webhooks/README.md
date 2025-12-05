# Zoho Webhooks Collection Variables

## Collection Variables (bru.json)

Collection-level variables jo sabhi requests mein available hain:

- `allowed_domains`: Allowed domains array
- `default_origin`: Default origin URL
- `webhook_version`: Webhook API version

## Environment Variables (bru.env)

### Local Environment

```env
base_url = http://localhost:3000
webhook_key = your-webhook-key-here
origin = https://zoho.com
port = 3000
```

### Production Environment

```env
base_url = https://your-production-url.com
webhook_key = your-production-webhook-key
origin = https://zoho.com
port = 443
```

### Staging Environment

```env
base_url = https://staging.your-domain.com
webhook_key = your-staging-webhook-key
origin = https://zoho.com
port = 443
```

## Usage

1. **Environment Select karein:**
   - Bruno mein top bar mein environment dropdown se `local`, `production`, ya `staging` select karein

2. **Variables Use karein:**
   - Requests mein `{{variable_name}}` format mein variables use kar sakte hain
   - Example: `{{base_url}}`, `{{webhook_key}}`, `{{origin}}`

3. **Variables Update karein:**
   - `bru.env` file mein environment-specific values update karein
   - `bru.json` mein collection-level variables update kar sakte hain

## Available Variables

### Environment Variables (bru.env)

- `base_url` - Server base URL
- `webhook_key` - Webhook authentication key
- `origin` - Origin header value
- `port` - Server port number

### Collection Variables (bru.json)

- `allowed_domains` - Array of allowed domains
- `default_origin` - Default origin URL
- `webhook_version` - API version

## Notes

- Environment variables environment-specific hain (local/production/staging)
- Collection variables sabhi environments mein same rahenge
- Variables ko update karne ke baad Bruno refresh karein
