import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{await page.setViewportSize({width:390,height:844});});
for(const programme of ['fetp','elms']){
 test(`${programme}: validation, preservation, review cancellation and submission`,async({page})=>{
  await page.goto(`?view=app#/initiatives/${programme}/register`);
  await page.getByRole('button',{name:programme==='elms'?'Review account':'Review request',exact:true}).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('input[aria-invalid=true]').first()).toBeFocused();
  await page.getByRole('button',{name:'Use fictional test details'}).click();
  const before=await page.locator('input').first().inputValue();
  await page.getByRole('button',{name:programme==='elms'?'Review account':'Review request',exact:true}).click();
  await page.getByRole('link',{name:'Edit details'}).click();
  await expect(page.locator('input').first()).toHaveValue(before);
  await page.getByRole('button',{name:programme==='elms'?'Review account':'Review request',exact:true}).click();
  await page.getByRole('button',{name:'Submit request'}).click();
  await page.getByRole('button',{name:'Cancel',exact:true}).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByRole('button',{name:'Submit request'}).click();
  await page.getByRole('button',{name:'Submit',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Demonstration completed'})).toBeVisible();
 });
}
test('all programmes and non-voice support have working destinations',async({page})=>{
 for(const id of ['mssp','fetp','fepa','fact','nflat','elms']){
  await page.goto('?view=app#/initiatives');
  await page.locator(`a[href="#/initiatives/${id}"]`).click();
  await expect(page.getByRole('heading',{name:id==='elms'?'E-LMS':id.toUpperCase(),exact:true,level:1})).toBeVisible();
 }
 await page.goto('?view=app#/findisha');
 await page.getByRole('link',{name:/Help & support/}).click();
 await page.getByRole('link',{name:/Live Chat/}).click();
 await page.getByRole('textbox',{name:'Your fictional question'}).fill('Where are the lessons?');
 await page.getByRole('button',{name:'Send message demonstration'}).click();
 await expect(page.getByRole('status')).toContainText('Nothing was sent or saved');
});
test('FinDisha conversation persists across navigation',async({page})=>{
 await page.goto('?view=app#/findisha');
 await page.getByRole('textbox',{name:'Type your message'}).fill('Bank accounts');
 await page.getByRole('button',{name:'Send message',exact:true}).click();
 await expect(page.getByRole('log')).toContainText('Simulated response');
 await page.getByRole('link',{name:'Messages Log',exact:true}).click();
 await expect(page.getByText('Bank accounts',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Go back'}).click();
 await expect(page.getByRole('log')).toContainText('Bank accounts');
});
test('capture registration and help evidence',async({page})=>{
 await page.goto('?view=app#/initiatives/fetp/register');await page.screenshot({path:'docs/screenshots/phase-4-fetp.png'});
 await page.goto('?view=app#/help');await page.screenshot({path:'docs/screenshots/phase-5-help.png'});
});
