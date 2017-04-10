import { LoupGarouPage } from './app.po';

describe('loup-garou App', () => {
  let page: LoupGarouPage;

  beforeEach(() => {
    page = new LoupGarouPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
