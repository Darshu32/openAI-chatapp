import * as readline from 'readline';
import Chat from './chat';
import 'dotenv/config';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error("❌ Error: OPENAI_API_KEY not found in .env file.");
    process.exit(1); // Exit if no key is found
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const chat = new Chat(apiKey);

const promptUser = () => {
    rl.question('You: ', async (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log('👋 Exiting chat, I am here if you need me again!');
            rl.close();
            return;
        }

        try {
            const response = await chat.sendMessage(input);
            console.log(`AI: ${response}`);
        } catch (error: any) {
            console.error("❌ Error:", error.message);
        }

        promptUser();
    });
};

console.log('Welcome to the OpenAI CLI Chat! Type "exit" to quit.');
promptUser();
