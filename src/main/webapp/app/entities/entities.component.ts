import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import CustomerService from './customer/customer.service';
import ProService from './pro/pro.service';
import CompanyService from './company/company.service';
import FoodService from './food/food.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('customerService') private customerService = () => new CustomerService();
  @Provide('proService') private proService = () => new ProService();
  @Provide('companyService') private companyService = () => new CompanyService();
  @Provide('foodService') private foodService = () => new FoodService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
