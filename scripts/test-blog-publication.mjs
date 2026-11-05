import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function load(file, dependencies = {}, now) {
  const exports = {};
  class Clock extends Date { static now() { return now ?? Date.now(); } }
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, {
    exports, Date: Clock,
    require: name => {
      assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  }, { filename: file });
  return exports;
}

const publication = load('lib/blogPublication.ts');
const index = load('lib/blogIndex.ts', { './blogPublication': publication });
const pard = 'pard-colombia-separacion-familiar-defensa';
const divorce = 'divorcio-unilateral-colombia';
const first = Date.parse('2026-11-06T13:00:00Z');
const second = Date.parse('2026-11-13T13:00:00Z');
assert.equal(Date.parse(publication.BLOG_PUBLICATION_SCHEDULE[pard]), first);
assert.equal(Date.parse(publication.BLOG_PUBLICATION_SCHEDULE[divorce]), second);
for (const [slug, instant] of [[pard, first], [divorce, second]]) {
  assert.equal(publication.isBlogPublished(slug, instant - 1), false);
  assert.equal(publication.isBlogPublished(slug, instant), true);
  assert.equal(publication.isBlogPublished(slug, instant + 1), true);
}
for (const [instant, expected] of [[first - 1, []], [first, [pard]], [second - 1, [pard]], [second, [pard, divorce]]]) {
  const published = index.getPublishedBlogArticles(instant);
  for (const slug of [pard, divorce]) assert.equal(published.some(a => a.slug === slug), expected.includes(slug));
  assert.ok(published.some(a => a.slug === 'divorcio-colombia'));
  const sitemap = load('app/sitemap.ts', {
    '@/lib/blogPublication': publication,
    '@/lib/serviceDetails': { serviceDetailList: [] },
  }, instant).default();
  for (const slug of [pard, divorce]) assert.equal(sitemap.some(a => a.url.endsWith('/blog/' + slug)), expected.includes(slug));
  assert.ok(sitemap.some(a => a.url.endsWith('/blog/divorcio-colombia')));
  const blogDate = Date.parse(sitemap.find(a => a.url.endsWith('/blog')).lastModified);
  assert.ok(blogDate <= instant);
}
console.log('PASS: Bogotá publication times; before/at/after each release; blog and sitemap visibility; existing articles preserved.');
