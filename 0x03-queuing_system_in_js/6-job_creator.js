var kue = require('kue')

const queue = kue.createQueue();
const jobData = {
  phoneNumber: '+2347062682820',
  message: 'Holberton School',
}

var job = queue.create('push_notification_code', {
  jobData
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
