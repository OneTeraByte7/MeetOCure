const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'routes');

const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));

console.log('Checking route files in', routesDir);

for (const file of files) {
  const full = path.join(routesDir, file);
  try {
    console.log('Requiring', file);
    require(full);
    console.log('OK:', file);
  } catch (err) {
    console.error('ERROR requiring', file);
    console.error(err && err.stack ? err.stack : err);
  }
  console.log('----');
}

console.log('Done.');
