<template>
  <div>
    <b-dropdown-item to="/customer">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.customer')">Customer</span>
    </b-dropdown-item>
    <b-dropdown-item to="/pro">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.pro')">Pro</span>
    </b-dropdown-item>
    <b-dropdown-item to="/company">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.company')">Company</span>
    </b-dropdown-item>
    <b-dropdown-item to="/food">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.food')">Food</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
