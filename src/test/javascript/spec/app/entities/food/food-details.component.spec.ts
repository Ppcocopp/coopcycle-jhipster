/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import FoodDetailComponent from '@/entities/food/food-details.vue';
import FoodClass from '@/entities/food/food-details.component';
import FoodService from '@/entities/food/food.service';
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
  describe('Food Management Detail Component', () => {
    let wrapper: Wrapper<FoodClass>;
    let comp: FoodClass;
    let foodServiceStub: SinonStubbedInstance<FoodService>;

    beforeEach(() => {
      foodServiceStub = sinon.createStubInstance<FoodService>(FoodService);

      wrapper = shallowMount<FoodClass>(FoodDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { foodService: () => foodServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundFood = { id: 123 };
        foodServiceStub.find.resolves(foundFood);

        // WHEN
        comp.retrieveFood(123);
        await comp.$nextTick();

        // THEN
        expect(comp.food).toBe(foundFood);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundFood = { id: 123 };
        foodServiceStub.find.resolves(foundFood);

        // WHEN
        comp.beforeRouteEnter({ params: { foodId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.food).toBe(foundFood);
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
