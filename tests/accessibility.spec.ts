import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('automated WCAG checks across representative screens, validation and feedback',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 for(const route of ['onboarding','home','learn/textbooks','learn/topics/financial-inclusion','initiatives/fetp/register','help','study','privacy']){
  await page.goto(`?view=app#/${route}`);await expect(page.locator('h1')).toBeVisible();
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),route).toEqual([]);
 }
 await page.goto('?view=app#/initiatives/fetp/register');await page.getByRole('button',{name:'Review request'}).click();
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 await page.goto('?view=app#/home');await page.getByRole('button',{name:'Give Feedback',exact:true}).click();
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Give Feedback',exact:true})).toBeFocused();
});
