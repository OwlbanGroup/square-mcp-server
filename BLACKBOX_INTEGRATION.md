# Blackbox AI Integration Guide

This document explains how to set up and use Blackbox AI integration with the Square MCP Server.

## Getting Started

### 1. Get Your API Key

1. Navigate to [Blackbox AI Dashboard](https://app.blackbox.ai/dashboard)
2. Go to **API Keys** section
3. Copy your API key

### 2. Configure Environment Variables

Add your API key to the `.env` file:

```bash
# .env file
BLACKBOX_API_KEY=your_api_key_here
BLACKBOX_API_BASE_URL=https://api.blackbox.ai
```

**Security Note:** Never commit your `.env` file to version control. Use `.env.example` as a template for other developers.

### 3. Build and Start the Server

```bash
npm run build
npm start
```

## Available Functions

The Blackbox AI service (`services/blackbox.ts`) provides the following functions:

### Chat Completion

```typescript
import { createChatCompletion } from './services/blackbox.js';

const response = await createChatCompletion({
  messages: [
    {
      role: 'user',
      content: 'How do I implement OAuth in Node.js?',
    },
  ],
  max_tokens: 1024,
  temperature: 0.7,
});

console.log(response.content[0].text);
```

### Code Generation

```typescript
import { generateCode } from './services/blackbox.js';

const code = await generateCode({
  prompt: 'Create a REST API endpoint for user management',
  language: 'typescript',
});

console.log(code);
```

### Code Analysis

```typescript
import { analyzeCode } from './services/blackbox.js';

const analysis = await analyzeCode(
  'const x = 1; console.log(x);',
  'performance'
);

console.log(analysis);
```

### Web Search

```typescript
import { webSearch } from './services/blackbox.js';

const results = await webSearch('latest TypeScript patterns 2025');

console.log(results);
```

### Health Check

```typescript
import { checkHealth } from './services/blackbox.js';

const isHealthy = await checkHealth();
console.log('API Status:', isHealthy);
```

## Available Models

Blackbox AI supports several models:

- **`gpt-5-claude-3.5`** (default) - Claude 3.5 model for general tasks
- **`gpt-5-codex`** - Specialized code generation model
- **`blackbox-search`** - Web search and information retrieval

## API Reference

For complete API documentation, visit [Blackbox AI Docs](https://docs.blackbox.ai/api-reference)

## Integration with MCP Server

To add Blackbox AI tools to your MCP server, you can:

1. **Extend existing services** with Blackbox AI capabilities
2. **Create new tools** that use Blackbox AI for code analysis
3. **Integrate with Square services** for enhanced functionality

Example:

```typescript
// In services/
import { generateCode, analyzeCode } from './blackbox.js';

export async function enhanceSquareIntegration(squareApiCall: string) {
  // Use Blackbox to generate optimized code
  const optimizedCode = await generateCode({
    prompt: `Optimize this Square API call: ${squareApiCall}`,
    language: 'typescript',
  });
  
  return optimizedCode;
}
```

## Troubleshooting

### "API Key not configured" Error

**Solution:** Make sure you have:
- Set `BLACKBOX_API_KEY` in your `.env` file
- Restarted the server after adding the API key
- Verified the key is valid from the dashboard

### Authentication Failed

**Solution:**
- Check that your API key is correct (copy it again from the dashboard)
- Ensure the key hasn't expired
- Verify you have API access enabled for your account

### Network Timeout

**Solution:**
- Check your internet connection
- Verify `BLACKBOX_API_BASE_URL` is set correctly
- Try using a different model

## Next Steps

1. ✅ API Key configured
2. ✅ Service installed
3. ✅ Environment variables set
4. Go to [Blackbox AI Docs](https://docs.blackbox.ai) for advanced features
5. Integrate Blackbox AI into your service endpoints

## Support

- [Blackbox AI Documentation](https://docs.blackbox.ai)
- [API Reference](https://docs.blackbox.ai/api-reference)
- [Authentication Guide](https://docs.blackbox.ai/api-reference/authentication)
