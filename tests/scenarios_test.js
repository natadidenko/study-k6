import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    get_posts: {
      executor: 'constant-vus',
      vus: 5,
      duration: '30s',
      exec: 'getPosts',
    },
    create_post: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '10s', target: 5 },
        { duration: '20s', target: 10 },
        { duration: '10s', target: 0 },
      ],
      exec: 'createPost',
    },
    update_post: {
      executor: 'per-vu-iterations',
      vus: 3,
      iterations: 5,
      exec: 'updatePost',
    },
    delete_post: {
      executor: 'shared-iterations',
      vus: 2,
      iterations: 10,
      exec: 'deletePost',
    },
  },
};

// Сценарій отримання постів
export function getPosts() {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}

// Сценарій створення поста
export function createPost() {
  const payload = JSON.stringify({
    title: 'New Post',
    body: 'This is a new post created during load testing.',
    userId: 1,
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post('https://jsonplaceholder.typicode.com/posts', payload, params);
  check(res, {
    'status is 201': (r) => r.status === 201,
    'response contains id': (r) => JSON.parse(r.body).id !== undefined,
  });
  sleep(1);
}

// Сценарій оновлення поста
export function updatePost() {
  const payload = JSON.stringify({
    id: 1,
    title: 'Updated Title',
    body: 'Updated post content.',
    userId: 1,
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.put('https://jsonplaceholder.typicode.com/posts/1', payload, params);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'title is updated': (r) => JSON.parse(r.body).title === 'Updated Title',
  });
  sleep(1);
}

// Сценарій видалення поста
export function deletePost() {
  const res = http.del('https://jsonplaceholder.typicode.com/posts/1');
  check(res, {
    'status is 200 or 204': (r) => r.status === 200 || r.status === 204,
  });
  sleep(1);
}
