import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,  // Віртуальних користувачів
  duration: '30s',  // Тривалість тесту
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');
  
  // Перевірка статусу відповіді
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
