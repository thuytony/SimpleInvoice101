describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login successfully', async () => {
    await element(by.id('username')).typeText('94756921275');
    await element(by.id('password')).typeText('Password@12345');
    const loginButton = element(by.id('login_btn'));
    await loginButton.tap();
    
    await expect(loginButton).not.toExist();
    await expect(element(by.id('invoice-list'))).toBeVisible();
  });

  it('should display error when create invoice with invalid data', async () => {
    await element(by.id('create-invoice-fab')).tap();
    await element(by.id('first-name')).typeText('Thuy');
    await element(by.id('last-name')).typeText('Nguyen');
    await element(by.id('item-name')).typeText('Item1');
    await element(by.id('quantity')).typeText('100');
    await element(by.id('rate')).typeText('12');
    await element(by.id('create-invoice-scrollview')).scrollTo('bottom');
    await element(by.id('due-date')).clearText();
    await element(by.id('due-date')).typeText('2025-03-30');
    await element(by.id('create-invoice-scrollview')).scrollTo('bottom');
    await element(by.id('create-invoice-btn')).tap();
    
    await expect(element(by.id('email-error'))).toBeVisible();
    await expect(element(by.id('email-error'))).toHaveText('Email is required');
  });

  it('should create new invoice', async () => {
    await element(by.id('create-invoice-fab')).tap();
    await element(by.id('first-name')).typeText('Thuy');
    await element(by.id('last-name')).typeText('Nguyen');
    await element(by.id('email')).typeText('abc@gmail.com');
    await element(by.id('item-name')).typeText('Item1');
    await element(by.id('quantity')).typeText('100');
    await element(by.id('rate')).typeText('12');
    await element(by.id('create-invoice-scrollview')).scrollTo('bottom');
    await element(by.id('due-date')).clearText();
    await element(by.id('due-date')).typeText('2025-03-30');
    await element(by.id('create-invoice-scrollview')).scrollTo('bottom');
    await element(by.id('create-invoice-btn')).tap();
    
    await expect(element(by.id('invoice-list'))).toBeVisible();
  });

});
