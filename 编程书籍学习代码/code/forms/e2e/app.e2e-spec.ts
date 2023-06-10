import { Angular2AppPage } from './app.po';

describe('ng-book Forms Example App', function() {
  let page: Angular2AppPage;

  beforeEach(() => {
    page = new Angular2AppPage();
  });

  it('should load the page', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual(`Angular 2 Forms Example`);
    expect(page.getCardHeaderText(0)).toContain(`Demo Form: with ng-model`);
  });

});
