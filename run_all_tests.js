import { execSync } from 'child_process';

// Запуск кожного тесту по черзі
execSync('k6 run /Users/natalkadidenko/Desktop/System/study-k6/project/tests/scenarios_test.js', { stdio: 'inherit' });
execSync('k6 run /Users/natalkadidenko/Desktop/System/study-k6/project/tests/create_post.js', { stdio: 'inherit' });
execSync('k6 run /Users/natalkadidenko/Desktop/System/study-k6/project/tests/get_posts.js', { stdio: 'inherit' });
execSync('k6 run /Users/natalkadidenko/Desktop/System/study-k6/project/tests/update_post.js', { stdio: 'inherit' });
