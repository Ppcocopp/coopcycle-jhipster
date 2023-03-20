import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required, minLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import ProService from '@/entities/pro/pro.service';
import { IPro } from '@/shared/model/pro.model';

import { ICompany, Company } from '@/shared/model/company.model';
import CompanyService from './company.service';

const validations: any = {
  company: {
    adress: {
      required,
    },
    image: {},
    website: {},
    description: {},
    name: {
      minLength: minLength(2),
    },
    mail: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class CompanyUpdate extends mixins(JhiDataUtils) {
  @Inject('companyService') private companyService: () => CompanyService;
  @Inject('alertService') private alertService: () => AlertService;

  public company: ICompany = new Company();

  @Inject('proService') private proService: () => ProService;

  public pros: IPro[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.companyId) {
        vm.retrieveCompany(to.params.companyId);
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
    if (this.company.id) {
      this.companyService()
        .update(this.company)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.company.updated', { param: param.id });
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
      this.companyService()
        .create(this.company)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.company.created', { param: param.id });
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

  public retrieveCompany(companyId): void {
    this.companyService()
      .find(companyId)
      .then(res => {
        this.company = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.company && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.company, field)) {
        this.company[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.company, fieldContentType)) {
        this.company[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.proService()
      .retrieve()
      .then(res => {
        this.pros = res.data;
      });
  }
}
