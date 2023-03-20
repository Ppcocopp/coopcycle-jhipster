/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CompanyDetailComponent from '@/entities/company/company-details.vue';
import CompanyClass from '@/entities/company/company-details.component';
import CompanyService from '@/entities/company/company.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Company Management Detail Component', () => {
    let wrapper: Wrapper<CompanyClass>;
    let comp: CompanyClass;
    let companyServiceStub: SinonStubbedInstance<CompanyService>;

    beforeEach(() => {
      companyServiceStub = sinon.createStubInstance<CompanyService>(CompanyService);

      wrapper = shallowMount<CompanyClass>(CompanyDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { companyService: () => companyServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCompany = { id: 123 };
        companyServiceStub.find.resolves(foundCompany);

        // WHEN
        comp.retrieveCompany(123);
        await comp.$nextTick();

        // THEN
        expect(comp.company).toBe(foundCompany);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCompany = { id: 123 };
        companyServiceStub.find.resolves(foundCompany);

        // WHEN
        comp.beforeRouteEnter({ params: { companyId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.company).toBe(foundCompany);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
