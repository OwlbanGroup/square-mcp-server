/**
 * Blackbox AI Service
 * Integration with Blackbox AI API for code generation and AI capabilities
 */

import fetch from 'node-fetch';
import { z } from 'zod';

/**
 * Blackbox AI configuration
 */
const BLACKBOX_API_KEY = process.env.BLACKBOX_API_KEY;
const BLACKBOX_API_BASE_URL = process.env.BLACKBOX_API_BASE_URL || 'https://api.blackbox.ai';

/**
 * Validate API key is configured
 */
function validateApiKey(): void {
  if (!BLACKBOX_API_KEY) {
    throw new Error('BLACKBOX_API_KEY is not configured. Please set it in your .env file');
  }
}

/**
 * Get Blackbox AI request headers
 * @returns Headers object with authentication
 */
function getBlackboxHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${BLACKBOX_API_KEY}`,
  };
}

/**
 * Chat completion request schema
 */
const ChatCompletionSchema = z.object({
  model: z.string().default('gpt-5-claude-3.5').optional(),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })),
  max_tokens: z.number().default(1024).optional(),
  temperature: z.number().default(0.7).optional(),
});

type ChatCompletionRequest = z.infer<typeof ChatCompletionSchema>;

/**
 * Create a chat completion request to Blackbox AI
 * @param request Chat completion request
 * @returns API response
 */
export async function createChatCompletion(request: ChatCompletionRequest): Promise<any> {
  validateApiKey();

  const validated = ChatCompletionSchema.parse(request);

  const response = await fetch(`${BLACKBOX_API_BASE_URL}/v1/messages`, {
    method: 'POST',
    headers: getBlackboxHeaders(),
    body: JSON.stringify(validated),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Blackbox AI API error: ${response.status} ${errorText}`);
  }

  return response.json();
}

/**
 * Code generation request schema
 */
const CodeGenerationSchema = z.object({
  prompt: z.string(),
  language: z.string().default('typescript').optional(),
  model: z.string().default('gpt-5-codex').optional(),
});

type CodeGenerationRequest = z.infer<typeof CodeGenerationSchema>;

/**
 * Generate code using Blackbox AI
 * @param request Code generation request
 * @returns Generated code
 */
export async function generateCode(request: CodeGenerationRequest): Promise<string> {
  validateApiKey();

  const validated = CodeGenerationSchema.parse(request);

  const response = await createChatCompletion({
    model: validated.model,
    messages: [
      {
        role: 'user',
        content: `Generate ${validated.language} code for: ${validated.prompt}`,
      },
    ],
  });

  return response.content?.[0]?.text || '';
}

/**
 * Analyze code with Blackbox AI
 * @param code Code to analyze
 * @param analysisType Type of analysis
 * @returns Analysis results
 */
export async function analyzeCode(code: string, analysisType: string = 'general'): Promise<string> {
  validateApiKey();

  const response = await createChatCompletion({
    messages: [
      {
        role: 'user',
        content: `Perform ${analysisType} analysis on this code:\n\n${code}`,
      },
    ],
  });

  return response.content?.[0]?.text || '';
}

/**
 * Web search using Blackbox AI
 * @param query Search query
 * @returns Search results
 */
export async function webSearch(query: string): Promise<string> {
  validateApiKey();

  const response = await createChatCompletion({
    model: 'blackbox-search',
    messages: [
      {
        role: 'user',
        content: query,
      },
    ],
  });

  return response.content?.[0]?.text || '';
}

/**
 * Check Blackbox AI API health
 * @returns Health status
 */
export async function checkHealth(): Promise<boolean> {
  try {
    validateApiKey();
    
    const response = await fetch(`${BLACKBOX_API_BASE_URL}/v1/messages`, {
      method: 'POST',
      headers: getBlackboxHeaders(),
      body: JSON.stringify({
        model: 'gpt-5-claude-3.5',
        messages: [
          {
            role: 'user',
            content: 'ping',
          },
        ],
        max_tokens: 10,
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
