var kue = require('kue')

const queue = kue.createQueue({
  redis: 'redis://127.0.0.1:6379'
});

queue.process('push_notification_code', (job, done  ) => {
  sendNotification(job.data.phoneNumber, job.data.message);
  console.log(job.id);
  done();
});

function sendNotification (phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}
