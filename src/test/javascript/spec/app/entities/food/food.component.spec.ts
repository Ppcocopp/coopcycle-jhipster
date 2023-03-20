/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import FoodComponent from '@/entities/food/food.vue';
import FoodClass from '@/entities/food/food.component';
import FoodService from '@/entities/food/food.service';
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
  describe('Food Management Component', () => {
    let wrapper: Wrapper<FoodClass>;
    let comp: FoodClass;
    let foodServiceStub: SinonStubbedInstance<FoodService>;

    beforeEach(() => {
      foodServiceStub = sinon.createStubInstance<FoodService>(FoodService);
      foodServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<FoodClass>(FoodComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          foodService: () => foodServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      foodServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllFoods();
      await comp.$nextTick();

      // THEN
      expect(foodServiceStub.retrieve.called).toBeTruthy();
      expect(comp.foods[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      foodServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(foodServiceStub.retrieve.callCount).toEqual(1);

      comp.removeFood();
      await comp.$nextTick();

      // THEN
      expect(foodServiceStub.delete.called).toBeTruthy();
      expect(foodServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
