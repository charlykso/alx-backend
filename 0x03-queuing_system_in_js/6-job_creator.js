var kue = require('kue')

const queue = kue.createQueue({
  redis: 'redis://127.0.0.1:6379'
});

var job = queue.create('push_notification_code', {
  phoneNumber: '+2347062682820',
  message: 'This is the code to verify your account',
}).save(function(err){
  if (!err) {
    console.log('Notification job created:', job.id);
  }
});
job.on('complete', () => {
  console.log('Notification job completed');
}).on('failed', () => {
  console.log('Notification job failed');
});
