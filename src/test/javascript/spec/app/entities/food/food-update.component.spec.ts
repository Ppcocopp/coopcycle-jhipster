/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import FoodUpdateComponent from '@/entities/food/food-update.vue';
import FoodClass from '@/entities/food/food-update.component';
import FoodService from '@/entities/food/food.service';

import CompanyService from '@/entities/company/company.service';
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
  describe('Food Management Update Component', () => {
    let wrapper: Wrapper<FoodClass>;
    let comp: FoodClass;
    let foodServiceStub: SinonStubbedInstance<FoodService>;

    beforeEach(() => {
      foodServiceStub = sinon.createStubInstance<FoodService>(FoodService);

      wrapper = shallowMount<FoodClass>(FoodUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          foodService: () => foodServiceStub,
          alertService: () => new AlertService(),

          companyService: () =>
            sinon.createStubInstance<CompanyService>(CompanyService, {
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
        comp.food = entity;
        foodServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(foodServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.food = entity;
        foodServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(foodServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundFood = { id: 123 };
        foodServiceStub.find.resolves(foundFood);
        foodServiceStub.retrieve.resolves([foundFood]);

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
