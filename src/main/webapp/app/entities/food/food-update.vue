<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="blogApp.food.home.createOrEditLabel" data-cy="FoodCreateUpdateHeading" v-text="$t('blogApp.food.home.createOrEditLabel')">
          Create or edit a Food
        </h2>
        <div>
          <div class="form-group" v-if="food.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="food.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.food.mealName')" for="food-mealName">Meal Name</label>
            <input
              type="text"
              class="form-control"
              name="mealName"
              id="food-mealName"
              data-cy="mealName"
              :class="{ valid: !$v.food.mealName.$invalid, invalid: $v.food.mealName.$invalid }"
              v-model="$v.food.mealName.$model"
              required
            />
            <div v-if="$v.food.mealName.$anyDirty && $v.food.mealName.$invalid">
              <small class="form-text text-danger" v-if="!$v.food.mealName.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.food.mealName.minLength"
                v-text="$t('entity.validation.minlength', { min: 3 })"
              >
                This field is required to be at least 3 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.food.price')" for="food-price">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="food-price"
              data-cy="price"
              :class="{ valid: !$v.food.price.$invalid, invalid: $v.food.price.$invalid }"
              v-model.number="$v.food.price.$model"
              required
            />
            <div v-if="$v.food.price.$anyDirty && $v.food.price.$invalid">
              <small class="form-text text-danger" v-if="!$v.food.price.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.food.price.min" v-text="$t('entity.validation.min', { min: 0 })">
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.food.price.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.food.decription')" for="food-decription">Decription</label>
            <input
              type="text"
              class="form-control"
              name="decription"
              id="food-decription"
              data-cy="decription"
              :class="{ valid: !$v.food.decription.$invalid, invalid: $v.food.decription.$invalid }"
              v-model="$v.food.decription.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.food.image')" for="food-image">Image</label>
            <div>
              <img
                v-bind:src="'data:' + food.imageContentType + ';base64,' + food.image"
                style="max-height: 100px"
                v-if="food.image"
                alt="food image"
              />
              <div v-if="food.image" class="form-text text-danger clearfix">
                <span class="pull-left">{{ food.imageContentType }}, {{ byteSize(food.image) }}</span>
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
                v-on:change="setFileData($event, food, 'image', true)"
                accept="image/*"
                v-text="$t('entity.action.addimage')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="image"
              id="food-image"
              data-cy="image"
              :class="{ valid: !$v.food.image.$invalid, invalid: $v.food.image.$invalid }"
              v-model="$v.food.image.$model"
            />
            <input type="hidden" class="form-control" name="imageContentType" id="food-imageContentType" v-model="food.imageContentType" />
            <div v-if="$v.food.image.$anyDirty && $v.food.image.$invalid"></div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.food.name')" for="food-name">Name</label>
            <select class="form-control" id="food-name" data-cy="name" name="name" v-model="food.name" required>
              <option v-if="!food.name" v-bind:value="null" selected></option>
              <option
                v-bind:value="food.name && companyOption.id === food.name.id ? food.name : companyOption"
                v-for="companyOption in companies"
                :key="companyOption.id"
              >
                {{ companyOption.id }}
              </option>
            </select>
          </div>
          <div v-if="$v.food.name.$anyDirty && $v.food.name.$invalid">
            <small class="form-text text-danger" v-if="!$v.food.name.required" v-text="$t('entity.validation.required')">
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
            :disabled="$v.food.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./food-update.component.ts"></script>
