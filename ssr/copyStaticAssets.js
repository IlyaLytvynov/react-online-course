const shell = require('shelljs');

shell.cp('-R', 'public', 'build');

process.abort();
