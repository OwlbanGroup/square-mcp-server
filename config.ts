/**
 * Shared configuration for Square API services and Blackbox AI integration
 */
import { Response } from 'node-fetch';
import { setBaseUrl } from './server.js';

/**
 * Configure base URL based on environment
 */
export const baseUrl = setBaseUrl()

/**
 * Square API version to use
 */
export const apiVersion = process.env.SQUARE_VERSION || '2025-04-16';

/**
 * Blackbox AI configuration
 */
export const blackboxConfig = {
  apiKey: process.env.BLACKBOX_API_KEY || '',
  baseUrl: process.env.BLACKBOX_API_BASE_URL || 'https://api.blackbox.ai',
  isConfigured: !!process.env.BLACKBOX_API_KEY,
};

/**
 * Standard request headers for Square API
 * @param accessToken Square API access token
 * @returns Headers object
 */
export function getRequestHeaders(accessToken: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
    'Square-Version': apiVersion,
    'User-Agent': 'Square-MCP-Server/0.1.1'
  };
}

/**
 * Handle API response
 * @param response node-fetch Response object
 * @returns Response text
 */
export async function handleResponse(response: Response): Promise<string> {
  // Handle response
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }

  // Return raw response text
  return await response.text().catch(() => {
    // Handle empty responses
    return '{"success": true}';
  });
}