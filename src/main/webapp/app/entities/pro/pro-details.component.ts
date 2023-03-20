import { Component, Vue, Inject } from 'vue-property-decorator';

import { IPro } from '@/shared/model/pro.model';
import ProService from './pro.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ProDetails extends Vue {
  @Inject('proService') private proService: () => ProService;
  @Inject('alertService') private alertService: () => AlertService;

  public pro: IPro = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.proId) {
        vm.retrievePro(to.params.proId);
      }
    });
  }

  public retrievePro(proId) {
    this.proService()
      .find(proId)
      .then(res => {
        this.pro = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
