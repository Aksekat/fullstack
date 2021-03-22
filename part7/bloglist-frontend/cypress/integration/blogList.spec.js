describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Akse Kat',
      username: 'aksekat',
      password: 'password'
    }
    const user2 = {
      name: 'Us Er2',
      username: 'user2',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('aksekat')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Akse Kat logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('aksekat')
      cy.get('#password').type('wrong_password')
      cy.get('#login-button').click()
      cy.get('.errorNotification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      // Doesn't work with "cypress open" for some reason: the debugger even
      // shows that errorNotification has the css. Works with the command
      // "cypress run"
      //.and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Akse Kat logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'aksekat', password: 'password' })
    })

    it('a blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('test.link')
      cy.get('#createButton').click()

      cy.get('.blogPage').contains('testTitle')
    })

    describe('and several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'testTitle1', author: 'testAuthor1', url: 'test1.link' })
        cy.createBlog({ title: 'testTitle2', author: 'testAuthor2', url: 'test2.link', likes: 3 })
        cy.createBlog({ title: 'testTitle3', author: 'testAuthor1', url: 'test3.link', likes: 6 })
      })

      it('a blog can be liked', function () {
        cy.contains('testTitle1').contains('View').click()
        cy.get('.likeButton').click()
        cy.get('.likes').contains('1')
      })

      it('a blog can be removed by the creator', function () {
        cy.contains('testTitle1').contains('View').click()
        cy.contains('Remove').click()
        cy.get('.blogPage').should('not.contain', 'testTitle1')
      })

      it('a blog cannot be removed by a user other than the creator', function () {
        cy.contains('Log out').click()
        cy.login({ username: 'user2', password: 'password' })
        cy.contains('testTitle1').contains('View').click()
        cy.get('html').should('not.contain', 'Remove')
      })

      it('blogs are sorted by likes', function () {
        let ordered = true
        cy.get('.viewButton').click({ multiple: true })
        cy.get('.likes')
          .then(likes => {
            for (let i = 0; i < likes.length - 1; i++) {
              if (parseInt(likes[i].innerHTML) < parseInt(likes[i + 1].innerHTML)) { ordered = false }
            }
            cy.wrap(ordered).should('be.true')
          })
      })
    })
  })
})