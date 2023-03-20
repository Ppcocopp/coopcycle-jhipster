<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="blogApp.pro.home.createOrEditLabel" data-cy="ProCreateUpdateHeading" v-text="$t('blogApp.pro.home.createOrEditLabel')">
          Create or edit a Pro
        </h2>
        <div>
          <div class="form-group" v-if="pro.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="pro.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.pro.description')" for="pro-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="pro-description"
              data-cy="description"
              :class="{ valid: !$v.pro.description.$invalid, invalid: $v.pro.description.$invalid }"
              v-model="$v.pro.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.pro.mail')" for="pro-mail">Mail</label>
            <select class="form-control" id="pro-mail" data-cy="mail" name="mail" v-model="pro.mail" required>
              <option v-if="!pro.mail" v-bind:value="null" selected></option>
              <option
                v-bind:value="pro.mail && userOption.id === pro.mail.id ? pro.mail : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.id }}
              </option>
            </select>
          </div>
          <div v-if="$v.pro.mail.$anyDirty && $v.pro.mail.$invalid">
            <small class="form-text text-danger" v-if="!$v.pro.mail.required" v-text="$t('entity.validation.required')">
              This field is required.
            </small>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.pro.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./pro-update.component.ts"></script>
