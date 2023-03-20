/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProDetailComponent from '@/entities/pro/pro-details.vue';
import ProClass from '@/entities/pro/pro-details.component';
import ProService from '@/entities/pro/pro.service';
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
  describe('Pro Management Detail Component', () => {
    let wrapper: Wrapper<ProClass>;
    let comp: ProClass;
    let proServiceStub: SinonStubbedInstance<ProService>;

    beforeEach(() => {
      proServiceStub = sinon.createStubInstance<ProService>(ProService);

      wrapper = shallowMount<ProClass>(ProDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { proService: () => proServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundPro = { id: 123 };
        proServiceStub.find.resolves(foundPro);

        // WHEN
        comp.retrievePro(123);
        await comp.$nextTick();

        // THEN
        expect(comp.pro).toBe(foundPro);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundPro = { id: 123 };
        proServiceStub.find.resolves(foundPro);

        // WHEN
        comp.beforeRouteEnter({ params: { proId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.pro).toBe(foundPro);
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
