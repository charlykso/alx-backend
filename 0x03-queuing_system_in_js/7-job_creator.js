const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

var kue = require('kue')

const queue = kue.createQueue({
  redis: 'redis://127.0.0.1:6379'
});

jobs.forEach((job) => {
  const newJob = queue.create('push_notification_code_2', job).save((err) => {
    if (!err) {
      console.log('Notification job created:', newJob.id);
    }
  });
  newJob.on('complete', () => {
    console.log(`Notification job ${newJob.id} completed`);
  }).on('failed', (error) => {
    console.log(`Notification job ${newJob.id} failed`, error);
  }).on('progress', (progress) => {
    console.log('Notification  job ' + newJob.id + ' ' + progress + '% complete');
  });
});
