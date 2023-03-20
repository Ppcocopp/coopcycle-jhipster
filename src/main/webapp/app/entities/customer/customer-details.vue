<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="customer">
        <h2 class="jh-entity-heading" data-cy="customerDetailsHeading">
          <span v-text="$t('blogApp.customer.detail.title')">Customer</span> {{ customer.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('blogApp.customer.adress')">Adress</span>
          </dt>
          <dd>
            <span>{{ customer.adress }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.customer.balance')">Balance</span>
          </dt>
          <dd>
            <span>{{ customer.balance }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.customer.phone')">Phone</span>
          </dt>
          <dd>
            <span>{{ customer.phone }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.customer.mail')">Mail</span>
          </dt>
          <dd>
            {{ customer.mail ? customer.mail.id : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="customer.id" :to="{ name: 'CustomerEdit', params: { customerId: customer.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./customer-details.component.ts"></script>
