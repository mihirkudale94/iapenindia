const fs = require('fs');

const html = fs.readFileSync('temp_home.html', 'utf16le');

// Find all hrefs
const regex = /href\s*=\s*['"]([^'"]+)['"]/ig;
let match;
const links = new Set();

while ((match = regex.exec(html)) !== null) {
  let link = match[1];
  if (link.startsWith('http://iapenindia.org') || link.startsWith('https://iapenindia.org') || link.startsWith('/') || !link.startsWith('http')) {
      if(link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('tel:')) continue;
      if (!link.startsWith('http')) {
        link = 'https://iapenindia.org/' + link.replace(/^\/+/, '');
      }
      // Ensure https
      link = link.replace('http://', 'https://');
      links.add(link);
  }
}

const linkArray = Array.from(links).sort();
console.log("Found links:");
linkArray.forEach(l => console.log(l));
fs.writeFileSync('temp_links.txt', linkArray.join('\n'), 'utf8');
