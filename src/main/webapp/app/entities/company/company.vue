<template>
  <div>
    <h2 id="page-heading" data-cy="CompanyHeading">
      <span v-text="$t('blogApp.company.home.title')" id="company-heading">Companies</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('blogApp.company.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CompanyCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-company"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('blogApp.company.home.createLabel')"> Create a new Company </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && companies && companies.length === 0">
      <span v-text="$t('blogApp.company.home.notFound')">No companies found</span>
    </div>
    <div class="table-responsive" v-if="companies && companies.length > 0">
      <table class="table table-striped" aria-describedby="companies">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('blogApp.company.adress')">Adress</span></th>
            <th scope="row"><span v-text="$t('blogApp.company.image')">Image</span></th>
            <th scope="row"><span v-text="$t('blogApp.company.website')">Website</span></th>
            <th scope="row"><span v-text="$t('blogApp.company.description')">Description</span></th>
            <th scope="row"><span v-text="$t('blogApp.company.name')">Name</span></th>
            <th scope="row"><span v-text="$t('blogApp.company.mail')">Mail</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in companies" :key="company.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CompanyView', params: { companyId: company.id } }">{{ company.id }}</router-link>
            </td>
            <td>{{ company.adress }}</td>
            <td>
              <a v-if="company.image" v-on:click="openFile(company.imageContentType, company.image)">
                <img
                  v-bind:src="'data:' + company.imageContentType + ';base64,' + company.image"
                  style="max-height: 30px"
                  alt="company image"
                />
              </a>
              <span v-if="company.image">{{ company.imageContentType }}, {{ byteSize(company.image) }}</span>
            </td>
            <td>{{ company.website }}</td>
            <td>{{ company.description }}</td>
            <td>{{ company.name }}</td>
            <td>
              <div v-if="company.mail">
                <router-link :to="{ name: 'ProView', params: { proId: company.mail.id } }">{{ company.mail.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CompanyView', params: { companyId: company.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CompanyEdit', params: { companyId: company.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(company)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="blogApp.company.delete.question" data-cy="companyDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-company-heading" v-text="$t('blogApp.company.delete.question', { id: removeId })">
          Are you sure you want to delete this Company?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-company"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCompany()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./company.component.ts"></script>
