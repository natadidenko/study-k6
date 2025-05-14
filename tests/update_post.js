import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5,
  duration: '15s',
};

export default function () {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const payload = JSON.stringify({
    title: 'Updated Title',
    body: 'Updated content',
    userId: 1,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.put(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'title is updated': (r) => JSON.parse(r.body).title === 'Updated Title',
  });

  sleep(1);
}
