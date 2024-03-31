import { isMainThread, threadId } from "worker_threads";

console.log(`\nProcess ID: ${process.pid}`);
console.log(`Node.js version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`CPU Usage: ${JSON.stringify(process.cpuUsage())}`);
console.log(`Memory Usage: ${JSON.stringify(process.memoryUsage())}`);

if (isMainThread) console.log(`Main Thread ID: ${threadId}\n\n`);