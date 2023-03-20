<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="blogApp.company.home.createOrEditLabel"
          data-cy="CompanyCreateUpdateHeading"
          v-text="$t('blogApp.company.home.createOrEditLabel')"
        >
          Create or edit a Company
        </h2>
        <div>
          <div class="form-group" v-if="company.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="company.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.company.adress')" for="company-adress">Adress</label>
            <input
              type="text"
              class="form-control"
              name="adress"
              id="company-adress"
              data-cy="adress"
              :class="{ valid: !$v.company.adress.$invalid, invalid: $v.company.adress.$invalid }"
              v-model="$v.company.adress.$model"
              required
            />
            <div v-if="$v.company.adress.$anyDirty && $v.company.adress.$invalid">
              <small class="form-text text-danger" v-if="!$v.company.adress.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.company.image')" for="company-image">Image</label>
            <div>
              <img
                v-bind:src="'data:' + company.imageContentType + ';base64,' + company.image"
                style="max-height: 100px"
                v-if="company.image"
                alt="company image"
              />
              <div v-if="company.image" class="form-text text-danger clearfix">
                <span class="pull-left">{{ company.imageContentType }}, {{ byteSize(company.image) }}</span>
                <button
                  type="button"
                  v-on:click="clearInputImage('image', 'imageContentType', 'file_image')"
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_image"
                id="file_image"
                data-cy="image"
                v-on:change="setFileData($event, company, 'image', true)"
                accept="image/*"
                v-text="$t('entity.action.addimage')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="image"
              id="company-image"
              data-cy="image"
              :class="{ valid: !$v.company.image.$invalid, invalid: $v.company.image.$invalid }"
              v-model="$v.company.image.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="imageContentType"
              id="company-imageContentType"
              v-model="company.imageContentType"
            />
            <div v-if="$v.company.image.$anyDirty && $v.company.image.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.company.website')" for="company-website">Website</label>
            <input
              type="text"
              class="form-control"
              name="website"
              id="company-website"
              data-cy="website"
              :class="{ valid: !$v.company.website.$invalid, invalid: $v.company.website.$invalid }"
              v-model="$v.company.website.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.company.description')" for="company-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="company-description"
              data-cy="description"
              :class="{ valid: !$v.company.description.$invalid, invalid: $v.company.description.$invalid }"
              v-model="$v.company.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.company.name')" for="company-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="company-name"
              data-cy="name"
              :class="{ valid: !$v.company.name.$invalid, invalid: $v.company.name.$invalid }"
              v-model="$v.company.name.$model"
            />
            <div v-if="$v.company.name.$anyDirty && $v.company.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.company.name.minLength" v-text="$t('entity.validation.minlength', { min: 2 })">
                This field is required to be at least 2 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.company.mail')" for="company-mail">Mail</label>
            <select class="form-control" id="company-mail" data-cy="mail" name="mail" v-model="company.mail" required>
              <option v-if="!company.mail" v-bind:value="null" selected></option>
              <option
                v-bind:value="company.mail && proOption.id === company.mail.id ? company.mail : proOption"
                v-for="proOption in pros"
                :key="proOption.id"
              >
                {{ proOption.id }}
              </option>
            </select>
          </div>
          <div v-if="$v.company.mail.$anyDirty && $v.company.mail.$invalid">
            <small class="form-text text-danger" v-if="!$v.company.mail.required" v-text="$t('entity.validation.required')">
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
            :disabled="$v.company.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./company-update.component.ts"></script>
