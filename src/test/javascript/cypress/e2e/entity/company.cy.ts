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

describe('Company e2e test', () => {
  const companyPageUrl = '/company';
  const companyPageUrlPattern = new RegExp('/company(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const companySample = {"adress":"b"};

  let company;
  // let pro;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/pros',
      body: {"description":"24/365"},
    }).then(({ body }) => {
      pro = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/companies+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/companies').as('postEntityRequest');
    cy.intercept('DELETE', '/api/companies/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/pros', {
      statusCode: 200,
      body: [pro],
    });

  });
   */

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

  /* Disabled due to incompatibility
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
   */

  it('Companies menu should load Companies page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('company');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Company').should('exist');
    cy.url().should('match', companyPageUrlPattern);
  });

  describe('Company page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(companyPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Company page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/company/new$'));
        cy.getEntityCreateUpdateHeading('Company');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', companyPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/companies',
          body: {
            ...companySample,
            mail: pro,
          },
        }).then(({ body }) => {
          company = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/companies+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [company],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(companyPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(companyPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Company page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('company');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', companyPageUrlPattern);
      });

      it('edit button click should load edit Company page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Company');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', companyPageUrlPattern);
      });

      it('edit button click should load edit Company page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Company');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', companyPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of Company', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('company').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', companyPageUrlPattern);

        company = undefined;
      });
    });
  });

  describe('new Company page', () => {
    beforeEach(() => {
      cy.visit(`${companyPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Company');
    });

    it.skip('should create an instance of Company', () => {
      cy.get(`[data-cy="adress"]`).type('distributed Tools').should('have.value', 'distributed Tools');

      cy.setFieldImageAsBytesOfEntity('image', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="website"]`).type('Buckinghamshire Synergized payment').should('have.value', 'Buckinghamshire Synergized payment');

      cy.get(`[data-cy="description"]`).type('Wooden encoding maximize').should('have.value', 'Wooden encoding maximize');

      cy.get(`[data-cy="name"]`).type('Borders FTP').should('have.value', 'Borders FTP');

      cy.get(`[data-cy="mail"]`).select(1);

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        company = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', companyPageUrlPattern);
    });
  });
});
