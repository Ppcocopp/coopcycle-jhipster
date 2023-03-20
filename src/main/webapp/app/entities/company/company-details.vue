<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="company">
        <h2 class="jh-entity-heading" data-cy="companyDetailsHeading">
          <span v-text="$t('blogApp.company.detail.title')">Company</span> {{ company.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('blogApp.company.adress')">Adress</span>
          </dt>
          <dd>
            <span>{{ company.adress }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.company.image')">Image</span>
          </dt>
          <dd>
            <div v-if="company.image">
              <a v-on:click="openFile(company.imageContentType, company.image)">
                <img
                  v-bind:src="'data:' + company.imageContentType + ';base64,' + company.image"
                  style="max-width: 100%"
                  alt="company image"
                />
              </a>
              {{ company.imageContentType }}, {{ byteSize(company.image) }}
            </div>
          </dd>
          <dt>
            <span v-text="$t('blogApp.company.website')">Website</span>
          </dt>
          <dd>
            <span>{{ company.website }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.company.description')">Description</span>
          </dt>
          <dd>
            <span>{{ company.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.company.name')">Name</span>
          </dt>
          <dd>
            <span>{{ company.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.company.mail')">Mail</span>
          </dt>
          <dd>
            <div v-if="company.mail">
              <router-link :to="{ name: 'ProView', params: { proId: company.mail.id } }">{{ company.mail.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="company.id" :to="{ name: 'CompanyEdit', params: { companyId: company.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./company-details.component.ts"></script>
