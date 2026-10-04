const fs = require('fs');

const SUPABASE_URL = "https://pminjwfckghbhhssrmtr.supabase.co";
const SUPABASE_KEY = "sb_publishable_g1VgEwpLvDzoT-JOFAWHtw_p4Ye1fNN";

async function run() {
  try {
    // Fetch only published blogs
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blogs?select=slug,updated_at&published=eq.true`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!res.ok) {
      throw new Error(`Supabase request failed: ${res.status}`);
    }

    const blogs = await res.json();

    let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

    /*
     * Remove previously generated dynamic blog URLs.
     * This prevents duplicate blog URLs when the workflow
     * runs multiple times.
     */
    sitemap = sitemap.replace(
      /<url>\s*<loc>https:\/\/www\.srunisexsalongaya\.com\/blog\/post\.html\?slug=[\s\S]*?<\/url>/g,
      ''
    );

    // Create fresh blog URLs
    const blogUrls = blogs.map(blog => {
      const lastmod = blog.updated_at
        ? blog.updated_at.split('T')[0]
        : new Date().toISOString().split('T')[0];

      return `
<url>
  <loc>https://www.srunisexsalongaya.com/blog/post.html?slug=${encodeURIComponent(blog.slug)}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>`;
    }).join('');

    // Add fresh blog URLs before closing urlset
    sitemap = sitemap.replace(
      '</urlset>',
      `${blogUrls}\n</urlset>`
    );

    fs.writeFileSync('sitemap.xml', sitemap);

    console.log(`Sitemap updated successfully. ${blogs.length} published blog(s) added.`);
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    process.exit(1);
  }
}

run();