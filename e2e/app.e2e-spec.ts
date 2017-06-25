import { VxComponents2Page } from './app.po';

describe('vx-components2 App', () => {
  let page: VxComponents2Page;

  beforeEach(() => {
    page = new VxComponents2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
