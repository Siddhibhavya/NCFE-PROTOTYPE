import {expect,type Page} from '@playwright/test';
export async function fillProgramme(page:Page){for(const input of await page.locator('form input').all()){const type=await input.getAttribute('type');await input.fill(type==='email'?'test@example.com':type==='tel'?'0000000000':type==='password'?'TestOnly1!':'Example');}}
export async function openApp(page:Page,route:string){await page.goto(`?view=app#/${route}`);await expect(page.locator('h1')).toBeVisible();await page.evaluate(()=>document.fonts.ready);}
