import cron from "node-cron";

const databaseScheduler = cron.schedule('* * * * *', () => {
    console.log('Cron job is running every minute.');
});

databaseScheduler.start();