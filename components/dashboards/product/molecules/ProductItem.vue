<script setup lang="ts">
import filters from "@/plugins/filters/currency";
import { ref } from 'vue'
import { useCartStore } from '@/stores/carts'

const props = defineProps({
  id: Number,
  name: String,
  description: String,
  unit: String,
  manufacturer_name: String,
  image: String,
  lastPrice: Number,
})
const successsnackbar = ref(false)
const rate = ref(5)

const cartStore = useCartStore()

const addToCart = () => {
  const product = {
    id: props.id,
    name: props.name,
    description: props.description,
    unit: props.unit,
    manufacturer_name: props.manufacturer_name,
    image: props.image,
    lastPrice: props.lastPrice,
    quantity: 1,
  }
  cartStore.ADD_TO_CART(product)
  successsnackbar.value = true
}
</script>

<template>
  <v-card class="rounded-md card-hover overflow-hidden tw-max-w-[250px] tw-h-[380px]" elevation="10">
    <router-link :to="`/products/${id}`">
      <img alt="product" class="w-100 tw-max-h-[250px]" :src="image" />
    </router-link>
    <div class="d-flex justify-end mr-3 mt-n6">
      <v-tooltip location="bottom" text="Add to Cart">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="ml-auto"
            color="primary"
            icon
            size="x-small"
            @click="addToCart"
          >
            <BasketIcon size="18" />
          </v-btn>
        </template>
      </v-tooltip>
    </div>
    <v-card-item class="pt-1">
      <h6 class="text-h6">{{ name }}</h6>

      <div class="d-flex align-center justify-space-between mt-1">
        <div class="d-flex align-center gap-2">
          <span class="tw-font-normal">
            {{ filters.currency(lastPrice) }}
          </span>
        </div>
        <v-rating v-model="rate" color="warning" density="compact" half-increments size="small" />
      </div>
    </v-card-item>
    <v-snackbar
      v-model="successsnackbar"
      class="text-white"
      color="success"
      location="bottom right"
      rounded="md"
      variant="flat"
      @click="addToCart"
    >
      Item Added to The Cart
    </v-snackbar>
  </v-card>
</template>
<style>
.descriptionH {
  height: 40px;
  overflow: hidden;
}
</style>
