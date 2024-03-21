const { exec } = require('child_process');
const { promisify } = require('util');
const getViews = require('./get');

const execProm = promisify(exec);

async function compileViews() {
  const build = process.argv[2];
  const views = await getViews();
  try {
    for (const view of views) {
      console.log(`Building ${view}`);
      await execProm(`cd "${view}" && npm run ${build}`);
    }
  } catch (err) {
    console.error(err);
  }
}

compileViews();