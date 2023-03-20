import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import UserService from '@/entities/user/user.service';

import { IPro, Pro } from '@/shared/model/pro.model';
import ProService from './pro.service';

const validations: any = {
  pro: {
    description: {},
    mail: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProUpdate extends Vue {
  @Inject('proService') private proService: () => ProService;
  @Inject('alertService') private alertService: () => AlertService;

  public pro: IPro = new Pro();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.proId) {
        vm.retrievePro(to.params.proId);
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
    if (this.pro.id) {
      this.proService()
        .update(this.pro)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.pro.updated', { param: param.id });
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
      this.proService()
        .create(this.pro)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.pro.created', { param: param.id });
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

  public retrievePro(proId): void {
    this.proService()
      .find(proId)
      .then(res => {
        this.pro = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
