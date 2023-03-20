/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ProComponent from '@/entities/pro/pro.vue';
import ProClass from '@/entities/pro/pro.component';
import ProService from '@/entities/pro/pro.service';
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
  describe('Pro Management Component', () => {
    let wrapper: Wrapper<ProClass>;
    let comp: ProClass;
    let proServiceStub: SinonStubbedInstance<ProService>;

    beforeEach(() => {
      proServiceStub = sinon.createStubInstance<ProService>(ProService);
      proServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProClass>(ProComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          proService: () => proServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      proServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllPros();
      await comp.$nextTick();

      // THEN
      expect(proServiceStub.retrieve.called).toBeTruthy();
      expect(comp.pros[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      proServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(proServiceStub.retrieve.callCount).toEqual(1);

      comp.removePro();
      await comp.$nextTick();

      // THEN
      expect(proServiceStub.delete.called).toBeTruthy();
      expect(proServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
