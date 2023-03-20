/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CompanyUpdateComponent from '@/entities/company/company-update.vue';
import CompanyClass from '@/entities/company/company-update.component';
import CompanyService from '@/entities/company/company.service';

import ProService from '@/entities/pro/pro.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Company Management Update Component', () => {
    let wrapper: Wrapper<CompanyClass>;
    let comp: CompanyClass;
    let companyServiceStub: SinonStubbedInstance<CompanyService>;

    beforeEach(() => {
      companyServiceStub = sinon.createStubInstance<CompanyService>(CompanyService);

      wrapper = shallowMount<CompanyClass>(CompanyUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          companyService: () => companyServiceStub,
          alertService: () => new AlertService(),

          proService: () =>
            sinon.createStubInstance<ProService>(ProService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.company = entity;
        companyServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(companyServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.company = entity;
        companyServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(companyServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCompany = { id: 123 };
        companyServiceStub.find.resolves(foundCompany);
        companyServiceStub.retrieve.resolves([foundCompany]);

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
