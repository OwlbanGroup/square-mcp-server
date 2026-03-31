/**
 * Blackbox AI Quick Start Examples
 * 
 * These examples demonstrate how to use the Blackbox AI integration
 * Run these after configuring your API key in the .env file
 */

import {
  createChatCompletion,
  generateCode,
  analyzeCode,
  webSearch,
  checkHealth,
} from './services/blackbox.js';

/**
 * Example 1: Simple Chat
 */
async function exampleSimpleChat() {
  console.log('Example 1: Simple Chat');
  
  const response = await createChatCompletion({
    messages: [
      {
        role: 'user',
        content: 'What are the best practices for secure API authentication?',
      },
    ],
  });

  console.log('Response:', response.content[0].text);
}

/**
 * Example 2: Code Generation
 */
async function exampleCodeGeneration() {
  console.log('\nExample 2: Code Generation');
  
  const code = await generateCode({
    prompt: 'Create a TypeScript function to validate email addresses',
    language: 'typescript',
  });

  console.log('Generated Code:', code);
}

/**
 * Example 3: Multi-turn Conversation
 */
async function exampleMultiTurn() {
  console.log('\nExample 3: Multi-turn Conversation');
  
  // First message
  const response1 = await createChatCompletion({
    messages: [
      {
        role: 'user',
        content: 'How do I implement a simple REST API in Node.js?',
      },
    ],
  });

  const assistantResponse = response1.content[0].text;
  console.log('Assistant:', assistantResponse);

  // Follow-up message
  const response2 = await createChatCompletion({
    messages: [
      {
        role: 'user',
        content: 'How do I implement a simple REST API in Node.js?',
      },
      {
        role: 'assistant',
        content: assistantResponse,
      },
      {
        role: 'user',
        content: 'Can you show me an example with Express.js?',
      },
    ],
  });

  console.log('Follow-up Response:', response2.content[0].text);
}

/**
 * Example 4: Code Analysis
 */
async function exampleCodeAnalysis() {
  console.log('\nExample 4: Code Analysis');
  
  const sampleCode = `
    function slowFunction(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          console.log(arr[i], arr[j]);
        }
      }
    }
  `;

  const analysis = await analyzeCode(sampleCode, 'performance');
  console.log('Analysis:', analysis);
}

/**
 * Example 5: Web Search
 */
async function exampleWebSearch() {
  console.log('\nExample 5: Web Search');
  
  const results = await webSearch('TypeScript async/await best practices 2025');
  console.log('Search Results:', results);
}

/**
 * Example 6: Health Check
 */
async function exampleHealthCheck() {
  console.log('\nExample 6: Health Check');
  
  const isHealthy = await checkHealth();
  console.log('API Health:', isHealthy ? 'Healthy ✓' : 'Unhealthy ✗');
}

/**
 * Run all examples
 */
async function runAllExamples() {
  try {
    console.log('=== Blackbox AI Quick Start Examples ===\n');

    // Check if API is configured
    const apiKey = process.env.BLACKBOX_API_KEY;
    if (!apiKey) {
      console.error('❌ Error: BLACKBOX_API_KEY not configured');
      console.error('Please add your API key to the .env file');
      process.exit(1);
    }

    // Check API health first
    console.log('Checking API health...');
    const isHealthy = await checkHealth();
    if (!isHealthy) {
      console.error('❌ API health check failed');
      console.error('Please verify your API key and internet connection');
      process.exit(1);
    }
    console.log('✓ API is healthy\n');

    // Run examples
    await exampleSimpleChat();
    await exampleCodeGeneration();
    await exampleMultiTurn();
    await exampleCodeAnalysis();
    await exampleWebSearch();
    await exampleHealthCheck();

    console.log('\n=== All Examples Completed ===');
  } catch (error) {
    console.error('Error running examples:', error);
    process.exit(1);
  }
}

// Run examples if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples();
}

export {
  exampleSimpleChat,
  exampleCodeGeneration,
  exampleMultiTurn,
  exampleCodeAnalysis,
  exampleWebSearch,
  exampleHealthCheck,
};
