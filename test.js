console.log('Test script started');

setTimeout(() => {
  console.log('Test script still running after 5 seconds');
}, 5000);

// Keep the process alive indefinitely (or until manually stopped)
setInterval(() => {}, 1000);
