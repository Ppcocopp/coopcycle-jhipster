import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Customer = () => import('@/entities/customer/customer.vue');
// prettier-ignore
const CustomerUpdate = () => import('@/entities/customer/customer-update.vue');
// prettier-ignore
const CustomerDetails = () => import('@/entities/customer/customer-details.vue');
// prettier-ignore
const Pro = () => import('@/entities/pro/pro.vue');
// prettier-ignore
const ProUpdate = () => import('@/entities/pro/pro-update.vue');
// prettier-ignore
const ProDetails = () => import('@/entities/pro/pro-details.vue');
// prettier-ignore
const Company = () => import('@/entities/company/company.vue');
// prettier-ignore
const CompanyUpdate = () => import('@/entities/company/company-update.vue');
// prettier-ignore
const CompanyDetails = () => import('@/entities/company/company-details.vue');
// prettier-ignore
const Food = () => import('@/entities/food/food.vue');
// prettier-ignore
const FoodUpdate = () => import('@/entities/food/food-update.vue');
// prettier-ignore
const FoodDetails = () => import('@/entities/food/food-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'customer',
      name: 'Customer',
      component: Customer,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'customer/new',
      name: 'CustomerCreate',
      component: CustomerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'customer/:customerId/edit',
      name: 'CustomerEdit',
      component: CustomerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'customer/:customerId/view',
      name: 'CustomerView',
      component: CustomerDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'pro',
      name: 'Pro',
      component: Pro,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'pro/new',
      name: 'ProCreate',
      component: ProUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'pro/:proId/edit',
      name: 'ProEdit',
      component: ProUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'pro/:proId/view',
      name: 'ProView',
      component: ProDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'company',
      name: 'Company',
      component: Company,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'company/new',
      name: 'CompanyCreate',
      component: CompanyUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'company/:companyId/edit',
      name: 'CompanyEdit',
      component: CompanyUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'company/:companyId/view',
      name: 'CompanyView',
      component: CompanyDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'food',
      name: 'Food',
      component: Food,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'food/new',
      name: 'FoodCreate',
      component: FoodUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'food/:foodId/edit',
      name: 'FoodEdit',
      component: FoodUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'food/:foodId/view',
      name: 'FoodView',
      component: FoodDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
