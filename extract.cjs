const fs = require('fs');

const html = fs.readFileSync('temp_home_utf8.html', 'utf8');

// Simple regex to extract text from body
let bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
let bodyHtml = bodyMatch ? bodyMatch[1] : html;

// Remove scripts and styles
bodyHtml = bodyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
bodyHtml = bodyHtml.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');

// Remove tags
let text = bodyHtml.replace(/<[^>]+>/g, ' ');

// Decode common HTML entities
text = text.replace(/&nbsp;/g, ' ');
text = text.replace(/&amp;/g, '&');
text = text.replace(/&lt;/g, '<');
text = text.replace(/&gt;/g, '>');
text = text.replace(/&quot;/g, '"');
text = text.replace(/&#39;/g, "'");

// Collapse whitespace
text = text.replace(/\s+/g, ' ').trim();

fs.writeFileSync('temp_home_text.txt', text, 'utf8');
console.log('Text extracted to temp_home_text.txt');
