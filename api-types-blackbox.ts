/**
 * Blackbox AI Type Definitions
 */

/**
 * Message role in conversation
 */
export type MessageRole = 'user' | 'assistant';

/**
 * Single message in a conversation
 */
export interface Message {
  role: MessageRole;
  content: string;
}

/**
 * Chat completion request
 */
export interface ChatCompletionRequest {
  model?: string;
  messages: Message[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
}

/**
 * Content block in response
 */
export interface ContentBlock {
  type: string;
  text?: string;
}

/**
 * Chat completion response
 */
export interface ChatCompletionResponse {
  id: string;
  type: string;
  role: string;
  content: ContentBlock[];
  model: string;
  stop_reason: string;
  stop_sequence?: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

/**
 * Tool use in tool calling
 */
export interface ToolUse {
  type: 'tool_use';
  id: string;
  name: string;
  input: Record<string, any>;
}

/**
 * Code generation request
 */
export interface CodeGenerationRequest {
  prompt: string;
  language?: string;
  model?: string;
  max_tokens?: number;
}

/**
 * Code analysis result
 */
export interface CodeAnalysisResult {
  issues: Array<{
    severity: 'error' | 'warning' | 'info';
    message: string;
    line?: number;
  }>;
  suggestions: string[];
  summary: string;
}

/**
 * Web search result
 */
export interface WebSearchResult {
  results: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
  query: string;
  count: number;
}

/**
 * Error response from Blackbox AI
 */
export interface BlackboxAIError {
  error: {
    type: string;
    message: string;
  };
}

/**
 * Rate limit headers
 */
export interface RateLimitInfo {
  remaining: number;
  limit: number;
  resetTime: Date;
}

/**
 * Available Blackbox AI models
 */
export enum BlackboxModel {
  CLAUDE_3_5 = 'gpt-5-claude-3.5',
  CODEX = 'gpt-5-codex',
  WEB_SEARCH = 'blackbox-search',
}

/**
 * Configuration options
 */
export interface BlackboxConfigOptions {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  retryCount?: number;
}
