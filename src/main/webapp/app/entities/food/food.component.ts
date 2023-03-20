import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IFood } from '@/shared/model/food.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import FoodService from './food.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Food extends mixins(JhiDataUtils) {
  @Inject('foodService') private foodService: () => FoodService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public foods: IFood[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllFoods();
  }

  public clear(): void {
    this.retrieveAllFoods();
  }

  public retrieveAllFoods(): void {
    this.isFetching = true;
    this.foodService()
      .retrieve()
      .then(
        res => {
          this.foods = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IFood): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeFood(): void {
    this.foodService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('blogApp.food.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllFoods();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
