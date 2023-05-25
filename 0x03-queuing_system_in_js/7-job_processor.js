const blacklist = ['4153518780', '4153518781'];

const kue = require('kue');
const queue = kue.createQueue({
  redis: 'redis://127.0.0.1:6379'
});

const sendNotification = (phoneNumber, message, job, done) => {
  job.progress(0, 100); // Start with 0% progress
  if (blacklist.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`))
  }else{
    job.progress(50, 100)
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
  }
}

queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
