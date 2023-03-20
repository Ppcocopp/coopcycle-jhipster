import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPro } from '@/shared/model/pro.model';

import ProService from './pro.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Pro extends Vue {
  @Inject('proService') private proService: () => ProService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public pros: IPro[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPros();
  }

  public clear(): void {
    this.retrieveAllPros();
  }

  public retrieveAllPros(): void {
    this.isFetching = true;
    this.proService()
      .retrieve()
      .then(
        res => {
          this.pros = res.data;
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

  public prepareRemove(instance: IPro): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removePro(): void {
    this.proService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('blogApp.pro.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllPros();
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
