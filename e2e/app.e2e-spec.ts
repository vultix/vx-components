import {VxComponentsPage} from './app.po';

describe('vx-components2 App', () => {
  let page: VxComponentsPage;

  beforeEach(() => {
    page = new VxComponentsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
