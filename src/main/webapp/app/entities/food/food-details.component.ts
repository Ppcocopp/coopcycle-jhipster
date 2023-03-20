import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IFood } from '@/shared/model/food.model';
import FoodService from './food.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class FoodDetails extends mixins(JhiDataUtils) {
  @Inject('foodService') private foodService: () => FoodService;
  @Inject('alertService') private alertService: () => AlertService;

  public food: IFood = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.foodId) {
        vm.retrieveFood(to.params.foodId);
      }
    });
  }

  public retrieveFood(foodId) {
    this.foodService()
      .find(foodId)
      .then(res => {
        this.food = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
