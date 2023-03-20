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

describe('Food e2e test', () => {
  const foodPageUrl = '/food';
  const foodPageUrlPattern = new RegExp('/food(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const foodSample = {"mealName":"Swaziland","price":6097};

  let food;
  // let company;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/companies',
      body: {"adress":"Salad a vortals","image":"Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=","imageContentType":"unknown","website":"programming eco-centric","description":"payment","name":"Birmanie Switchable Singapour"},
    }).then(({ body }) => {
      company = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/foods+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/foods').as('postEntityRequest');
    cy.intercept('DELETE', '/api/foods/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/companies', {
      statusCode: 200,
      body: [company],
    });

  });
   */

  afterEach(() => {
    if (food) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/foods/${food.id}`,
      }).then(() => {
        food = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (company) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/companies/${company.id}`,
      }).then(() => {
        company = undefined;
      });
    }
  });
   */

  it('Foods menu should load Foods page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('food');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Food').should('exist');
    cy.url().should('match', foodPageUrlPattern);
  });

  describe('Food page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(foodPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Food page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/food/new$'));
        cy.getEntityCreateUpdateHeading('Food');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', foodPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/foods',
          body: {
            ...foodSample,
            name: company,
          },
        }).then(({ body }) => {
          food = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/foods+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [food],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(foodPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(foodPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Food page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('food');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', foodPageUrlPattern);
      });

      it('edit button click should load edit Food page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Food');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', foodPageUrlPattern);
      });

      it('edit button click should load edit Food page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Food');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', foodPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of Food', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('food').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', foodPageUrlPattern);

        food = undefined;
      });
    });
  });

  describe('new Food page', () => {
    beforeEach(() => {
      cy.visit(`${foodPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Food');
    });

    it.skip('should create an instance of Food', () => {
      cy.get(`[data-cy="mealName"]`).type('info-mediaries').should('have.value', 'info-mediaries');

      cy.get(`[data-cy="price"]`).type('44487').should('have.value', '44487');

      cy.get(`[data-cy="decription"]`).type('programming').should('have.value', 'programming');

      cy.setFieldImageAsBytesOfEntity('image', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="name"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        food = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', foodPageUrlPattern);
    });
  });
});
