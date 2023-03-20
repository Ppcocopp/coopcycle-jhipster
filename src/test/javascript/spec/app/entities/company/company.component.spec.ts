/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CompanyComponent from '@/entities/company/company.vue';
import CompanyClass from '@/entities/company/company.component';
import CompanyService from '@/entities/company/company.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Company Management Component', () => {
    let wrapper: Wrapper<CompanyClass>;
    let comp: CompanyClass;
    let companyServiceStub: SinonStubbedInstance<CompanyService>;

    beforeEach(() => {
      companyServiceStub = sinon.createStubInstance<CompanyService>(CompanyService);
      companyServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CompanyClass>(CompanyComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          companyService: () => companyServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      companyServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCompanys();
      await comp.$nextTick();

      // THEN
      expect(companyServiceStub.retrieve.called).toBeTruthy();
      expect(comp.companies[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      companyServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(companyServiceStub.retrieve.callCount).toEqual(1);

      comp.removeCompany();
      await comp.$nextTick();

      // THEN
      expect(companyServiceStub.delete.called).toBeTruthy();
      expect(companyServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
