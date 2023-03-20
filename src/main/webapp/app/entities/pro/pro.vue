<template>
  <div>
    <h2 id="page-heading" data-cy="ProHeading">
      <span v-text="$t('blogApp.pro.home.title')" id="pro-heading">Pros</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('blogApp.pro.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProCreate' }" custom v-slot="{ navigate }">
          <button @click="navigate" id="jh-create-entity" data-cy="entityCreateButton" class="btn btn-primary jh-create-entity create-pro">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('blogApp.pro.home.createLabel')"> Create a new Pro </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && pros && pros.length === 0">
      <span v-text="$t('blogApp.pro.home.notFound')">No pros found</span>
    </div>
    <div class="table-responsive" v-if="pros && pros.length > 0">
      <table class="table table-striped" aria-describedby="pros">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('blogApp.pro.description')">Description</span></th>
            <th scope="row"><span v-text="$t('blogApp.pro.mail')">Mail</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pro in pros" :key="pro.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProView', params: { proId: pro.id } }">{{ pro.id }}</router-link>
            </td>
            <td>{{ pro.description }}</td>
            <td>
              {{ pro.mail ? pro.mail.id : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ProView', params: { proId: pro.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ProEdit', params: { proId: pro.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(pro)"
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
        ><span id="blogApp.pro.delete.question" data-cy="proDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-pro-heading" v-text="$t('blogApp.pro.delete.question', { id: removeId })">
          Are you sure you want to delete this Pro?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-pro"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removePro()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./pro.component.ts"></script>
