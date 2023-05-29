// describe it 使用的 Mocha
describe('My First Test', () => {
  it('Does not do much!', () => {
    // 断言使用的 chai
    // expect(true).to.equal(true)
    // expect(true).to.equal(true)

    cy.visit('https://baidu.com')

    cy.contains('百度一下')

    // $('选择器')
    cy.get('#kw').type('Hello World{enter}')
    cy.contains('hello world(程序代码) - 百度百科')
  })
})
