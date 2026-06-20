const fs = require('fs');
const glob = require('glob');

glob.sync('src/**/*.{js,jsx}').forEach(f => {
  let data = fs.readFileSync(f, 'utf8');
  let newData = data.replace(/^import React(?:, )?(.*?) from 'react';\r?\n/gm, (match, p1) => {
    if (!p1 || p1.trim() === '') return '';
    return `import ${p1} from 'react';\n`;
  });
  if (newData !== data) {
    fs.writeFileSync(f, newData);
    console.log('Fixed ' + f);
  }
});
