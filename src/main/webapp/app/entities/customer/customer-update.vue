<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="blogApp.customer.home.createOrEditLabel"
          data-cy="CustomerCreateUpdateHeading"
          v-text="$t('blogApp.customer.home.createOrEditLabel')"
        >
          Create or edit a Customer
        </h2>
        <div>
          <div class="form-group" v-if="customer.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="customer.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.customer.adress')" for="customer-adress">Adress</label>
            <input
              type="text"
              class="form-control"
              name="adress"
              id="customer-adress"
              data-cy="adress"
              :class="{ valid: !$v.customer.adress.$invalid, invalid: $v.customer.adress.$invalid }"
              v-model="$v.customer.adress.$model"
              required
            />
            <div v-if="$v.customer.adress.$anyDirty && $v.customer.adress.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.adress.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.customer.balance')" for="customer-balance">Balance</label>
            <input
              type="number"
              class="form-control"
              name="balance"
              id="customer-balance"
              data-cy="balance"
              :class="{ valid: !$v.customer.balance.$invalid, invalid: $v.customer.balance.$invalid }"
              v-model.number="$v.customer.balance.$model"
              required
            />
            <div v-if="$v.customer.balance.$anyDirty && $v.customer.balance.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.balance.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.customer.balance.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.customer.phone')" for="customer-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="customer-phone"
              data-cy="phone"
              :class="{ valid: !$v.customer.phone.$invalid, invalid: $v.customer.phone.$invalid }"
              v-model="$v.customer.phone.$model"
            />
            <div v-if="$v.customer.phone.$anyDirty && $v.customer.phone.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.customer.mail')" for="customer-mail">Mail</label>
            <select class="form-control" id="customer-mail" data-cy="mail" name="mail" v-model="customer.mail" required>
              <option v-if="!customer.mail" v-bind:value="null" selected></option>
              <option
                v-bind:value="customer.mail && userOption.id === customer.mail.id ? customer.mail : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.id }}
              </option>
            </select>
          </div>
          <div v-if="$v.customer.mail.$anyDirty && $v.customer.mail.$invalid">
            <small class="form-text text-danger" v-if="!$v.customer.mail.required" v-text="$t('entity.validation.required')">
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
            :disabled="$v.customer.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./customer-update.component.ts"></script>
