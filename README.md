# Metadata Node

A Node.js application that extracts metadata from URLs using Express and Cheerio.

## Features

- Extracts metadata from web pages including:
  - Title
  - Description
  - Open Graph metadata
  - Twitter Card metadata
- Built-in security features:
  - Helmet for security headers
  - CORS protection with client whitelisting
  - URL validation
  - Error handling
  - Request timeout

## Installation

### Local Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3001
   NODE_ENV=development
   ALLOWED_CLIENTS=https://x-tracker.kartikbhalla.dev/
   ```

### Docker Installation

1. Create a `.env` file in the root directory with your environment variables:
   ```
   PORT=3001
   NODE_ENV=development
   ALLOWED_CLIENTS=https://x-tracker.kartikbhalla.dev/
   ```

2. Build the Docker image:
   ```bash
   docker build -t metadata-node .
   ```

3. Run the container:
   ```bash
   docker run -p 3001:3001 metadata-node
   ```

   The container will automatically use the environment variables from your `.env` file.

## Usage

1. Start the server:
   ```bash
   # For local installation
   node app.js

   # For Docker
   docker run -p 3001:3001 metadata-node
   ```

2. Make a GET request to the metadata endpoint:
   ```
   GET /metadata?url=https://example.com
   ```

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Only allows requests from whitelisted client URLs
- **URL Validation**: Validates input URLs
- **Request Timeout**: 5-second timeout for external requests
- **Error Handling**: Proper error responses with optional detailed messages in development

## Response Format

```json
{
  "title": "Page Title",
  "description": "Page description",
  "ogTitle": "Open Graph Title",
  "ogDescription": "Open Graph Description",
  "ogImage": "Open Graph Image URL",
  "ogUrl": "Open Graph URL",
  "twitterTitle": "Twitter Card Title",
  "twitterDescription": "Twitter Card Description",
  "twitterImage": "Twitter Card Image URL"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400: Invalid or missing URL
- 500: Server error or failed to fetch metadata
- 403: Request from unauthorized client 