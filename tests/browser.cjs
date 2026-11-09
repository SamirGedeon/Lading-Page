const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  fs.mkdirSync('artifacts', {recursive:true});
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto((process.env.BASE_URL || 'http://localhost:8000') + '/landing-page-tailwind-social-media-main/landing-page-tailwind-social-media-main/');
    for (const width of [1440, 390]) {
      await page.setViewportSize({width,height:900});
      await page.locator('[data-service="Site institucional"]').click();
      assert.equal(await page.locator('#service').inputValue(), 'Site institucional');
      await page.locator('#name').fill('Negócio demonstrativo');
      await page.locator('#message').fill('Apresentar serviços e organizar pedidos de orçamento.');
      const downloadPromise = page.waitForEvent('download');
      await page.locator('button[type="submit"]').click();
      const download = await downloadPromise;
      assert.equal(download.suggestedFilename(), 'briefing-projeto.txt');
      const data = fs.readFileSync(await download.path(),'utf8');
      assert.match(data,/Negócio demonstrativo/);
      assert.match(data,/Site institucional/);
      const before = await page.locator('#theme-toggle').getAttribute('aria-pressed');
      await page.locator('#theme-toggle').click();
      assert.notEqual(await page.locator('#theme-toggle').getAttribute('aria-pressed'), before);
      await page.reload();
      assert.notEqual(await page.locator('#theme-toggle').getAttribute('aria-pressed'), before);
      if (await page.locator('#theme-toggle').getAttribute('aria-pressed') === 'true') await page.locator('#theme-toggle').click();
      await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.screenshot({path:`artifacts/drew-${width}.png`, fullPage:true});
    }
    assert.deepEqual(errors,[]);
    console.log('OK: navegação, briefing baixado, tema persistido, imagens e duas larguras.');
  } finally { await browser.close(); }
})().catch(e => {console.error(e);process.exitCode=1;});
