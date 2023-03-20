import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Pro e2e test', () => {
  const proPageUrl = '/pro';
  const proPageUrlPattern = new RegExp('/pro(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const proSample = {};

  let pro;
  // let user;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: {"login":"circuit Synergistic Rubber","firstName":"Briac","lastName":"Leclercq"},
    }).then(({ body }) => {
      user = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/pros+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/pros').as('postEntityRequest');
    cy.intercept('DELETE', '/api/pros/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [user],
    });

  });
   */

  afterEach(() => {
    if (pro) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/pros/${pro.id}`,
      }).then(() => {
        pro = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (user) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/users/${user.id}`,
      }).then(() => {
        user = undefined;
      });
    }
  });
   */

  it('Pros menu should load Pros page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('pro');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Pro').should('exist');
    cy.url().should('match', proPageUrlPattern);
  });

  describe('Pro page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(proPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Pro page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/pro/new$'));
        cy.getEntityCreateUpdateHeading('Pro');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', proPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/pros',
          body: {
            ...proSample,
            mail: user,
          },
        }).then(({ body }) => {
          pro = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/pros+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [pro],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(proPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(proPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Pro page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('pro');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', proPageUrlPattern);
      });

      it('edit button click should load edit Pro page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Pro');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', proPageUrlPattern);
      });

      it('edit button click should load edit Pro page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Pro');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', proPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of Pro', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('pro').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', proPageUrlPattern);

        pro = undefined;
      });
    });
  });

  describe('new Pro page', () => {
    beforeEach(() => {
      cy.visit(`${proPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Pro');
    });

    it.skip('should create an instance of Pro', () => {
      cy.get(`[data-cy="description"]`)
        .type('Account Languedoc-Roussillon Ingenieur')
        .should('have.value', 'Account Languedoc-Roussillon Ingenieur');

      cy.get(`[data-cy="mail"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        pro = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', proPageUrlPattern);
    });
  });
});
