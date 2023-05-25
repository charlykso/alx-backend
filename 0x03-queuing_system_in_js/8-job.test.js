const kue = require('kue');
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  const queue = kue.createQueue({
    redis: 'redis://127.0.0.1:6379'
  });


  it('should create jobs and add them to the queue', () => {
    const notifications = [
      { phoneNumber: '4153518780', message: 'Notification 1' },
      { phoneNumber: '4153518781', message: 'Notification 2' },
      { phoneNumber: '4153518782', message: 'Notification 3' },
    ];

    createPushNotificationsJobs(notifications, queue);

    expect(queue.testMode.jobs.length).toBe(3);
    expect(queue.testMode.jobs[0].type).toBe('push_notification_code');
    expect(queue.testMode.jobs[0].data).toEqual({ phoneNumber: '4153518780', message: 'Notification 1' });
    expect(queue.testMode.jobs[1].type).toBe('push_notification_code');
    expect(queue.testMode.jobs[1].data).toEqual({ phoneNumber: '4153518781', message: 'Notification 2' });
    expect(queue.testMode.jobs[2].type).toBe('push_notification_code');
    expect(queue.testMode.jobs[2].data).toEqual({ phoneNumber: '4153518782', message: 'Notification 3' });
  });

  queue.testMode.clear();
  queue.testMode.exit();
});
