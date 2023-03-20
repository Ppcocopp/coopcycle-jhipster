import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required, minLength, decimal, minValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import CompanyService from '@/entities/company/company.service';
import { ICompany } from '@/shared/model/company.model';

import { IFood, Food } from '@/shared/model/food.model';
import FoodService from './food.service';

const validations: any = {
  food: {
    mealName: {
      required,
      minLength: minLength(3),
    },
    price: {
      required,
      decimal,
      min: minValue(0),
    },
    decription: {},
    image: {},
    name: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class FoodUpdate extends mixins(JhiDataUtils) {
  @Inject('foodService') private foodService: () => FoodService;
  @Inject('alertService') private alertService: () => AlertService;

  public food: IFood = new Food();

  @Inject('companyService') private companyService: () => CompanyService;

  public companies: ICompany[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.foodId) {
        vm.retrieveFood(to.params.foodId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.food.id) {
      this.foodService()
        .update(this.food)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.food.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.foodService()
        .create(this.food)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.food.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveFood(foodId): void {
    this.foodService()
      .find(foodId)
      .then(res => {
        this.food = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.food && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.food, field)) {
        this.food[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.food, fieldContentType)) {
        this.food[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.companyService()
      .retrieve()
      .then(res => {
        this.companies = res.data;
      });
  }
}
