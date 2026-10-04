const fs = require('fs');

const SUPABASE_URL = "https://pminjwfckghbhhssrmtr.supabase.co";
const SUPABASE_KEY = "sb_publishable_g1VgEwpLvDzoT-JOFAWHtw_p4Ye1fNN";

async function run() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blogs?select=slug,updated_at&published=eq.true`,
    { headers: { apikey: SUPABASE_KEY } }
  );

  const blogs = await res.json();

  let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

  const blogUrls = blogs.map(b => `
  <url>
    <loc>https://www.srunisexsalongaya.com/blog/post.html?slug=${b.slug}</loc>
    <lastmod>${b.updated_at.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  sitemap = sitemap.replace('</urlset>', blogUrls + '\n</urlset>');

  fs.writeFileSync('sitemap.xml', sitemap);
}

run();