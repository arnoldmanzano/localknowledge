describe('LocalKnowledgeApp', function() {
  it('loads and has a title', function() {
    browser.get('http://localhost:8000');
    expect(browser.getTitle()).toEqual('LocalKnowledge');
  });
});
