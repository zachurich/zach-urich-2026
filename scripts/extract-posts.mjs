import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = resolve(__dirname, '../src/content/posts');

const posts = [
  { slug: 'sharing-ideas', date: '2026-02-14' },
  { slug: 'unit-test-the-result-not-the-implementation', date: '2025-07-27' },
  { slug: 'checking-in-1', date: '2023-08-31' },
  { slug: 'made-a-new-website', date: '2022-04-04' },
  { slug: 'website-basics-html', date: '2021-01-03' },
  { slug: 'i-used-to-think-that-strength-meant-not-expression', date: '2019-05-13' },
  { slug: 'life-hack-culture-is-dumb', date: '2019-05-09' },
  { slug: 'guidelines-to-keep-in-mind-when-embracing-unknowns', date: '2018-11-24' },
  { slug: 'education-and-learning', date: '2018-11-20' },
];

mkdirSync(contentDir, { recursive: true });

for (const { slug, date } of posts) {
  const url = `https://zachurich.com/posts/${slug}`;
  console.log(`Fetching: ${url}`);

  const raw = execSync(
    `node node_modules/defuddle/dist/cli.js parse "${url}" --markdown --json`,
    { encoding: 'utf-8' }
  );

  const data = JSON.parse(raw);
  const { title, content, description } = data;

  const mdx = `export const metadata = {
  title: ${JSON.stringify(title)},
  date: ${JSON.stringify(date)},
  description: ${JSON.stringify(description || '')},
  slug: ${JSON.stringify(slug)},
};

# ${title}

${content.trim()}
`;

  const outPath = resolve(contentDir, `${slug}.mdx`);
  writeFileSync(outPath, mdx, 'utf-8');
  console.log(`  -> wrote ${outPath}`);
}

console.log('\nDone! Extracted', posts.length, 'posts.');
