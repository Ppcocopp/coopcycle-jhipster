<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="food">
        <h2 class="jh-entity-heading" data-cy="foodDetailsHeading">
          <span v-text="$t('blogApp.food.detail.title')">Food</span> {{ food.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('blogApp.food.mealName')">Meal Name</span>
          </dt>
          <dd>
            <span>{{ food.mealName }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.food.price')">Price</span>
          </dt>
          <dd>
            <span>{{ food.price }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.food.decription')">Decription</span>
          </dt>
          <dd>
            <span>{{ food.decription }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.food.image')">Image</span>
          </dt>
          <dd>
            <div v-if="food.image">
              <a v-on:click="openFile(food.imageContentType, food.image)">
                <img v-bind:src="'data:' + food.imageContentType + ';base64,' + food.image" style="max-width: 100%" alt="food image" />
              </a>
              {{ food.imageContentType }}, {{ byteSize(food.image) }}
            </div>
          </dd>
          <dt>
            <span v-text="$t('blogApp.food.name')">Name</span>
          </dt>
          <dd>
            <div v-if="food.name">
              <router-link :to="{ name: 'CompanyView', params: { companyId: food.name.id } }">{{ food.name.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="food.id" :to="{ name: 'FoodEdit', params: { foodId: food.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./food-details.component.ts"></script>
