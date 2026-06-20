import fs from 'fs/promises';

const linksContent = await fs.readFile('temp_links.txt', 'utf8');
const links = linksContent.split('\n').filter(Boolean);

const validLinks = links.filter(link => {
  if (link.includes('.css') || link.includes('.pdf') || link.includes('wp-json') || link.includes('xmlrpc.php') || link.includes('fonts.googleapis.com')) return false;
  if (!link.startsWith('https://iapenindia.org/')) return false;
  return true;
});

await fs.mkdir('scraper_output', { recursive: true });

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

for (const link of validLinks) {
  try {
    console.log(`Fetching ${link}...`);
    const response = await fetch(link, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    if (!response.ok) {
        console.log(`Failed: ${response.status}`);
        continue;
    }
    const html = await response.text();
    
    // basic text extraction
    let bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    let bodyHtml = bodyMatch ? bodyMatch[1] : html;
    
    bodyHtml = bodyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
    bodyHtml = bodyHtml.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
    bodyHtml = bodyHtml.replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ');
    bodyHtml = bodyHtml.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ');
    
    let text = bodyHtml.replace(/<[^>]+>/g, ' ');
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#8211;/g, '-');
    text = text.replace(/&#8217;/g, "'");
    text = text.replace(/\s+/g, ' ').trim();

    let filename = link.replace('https://iapenindia.org/', '').replace(/\/$/, '').replace(/\//g, '_');
    if (!filename) filename = 'index';
    
    await fs.writeFile(`scraper_output/${filename}.txt`, text, 'utf8');
    await delay(100); // polite delay
  } catch (err) {
    console.error(`Error fetching ${link}: ${err.message}`);
  }
}
console.log("Done scraping.");
