// userInput.js

import { createInterface } from 'readline';

// A simple library for getting user input
const userInput = {
  prompt: function(question) {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      readline.question(question, (answer) => {
        readline.close();
        resolve(answer);
      });
    });
  }
};

export default userInput;
