import { BuildToolUIPage } from './app.po';

describe('build-tool-ui App', function() {
  let page: BuildToolUIPage;

  beforeEach(() => {
    page = new BuildToolUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
