<script setup lang="ts">
import { ref } from 'vue'
import ProductItemVue from '@/components/dashboards/product/molecules/ProductItem.vue'
import ProductEmplty from '@/components/dashboards/product/molecules/ProductEmplty.vue'
import useGetProducts from "@/composables/use-get-products";
import {useQueryClient} from "vue-query";

const page = ref({ title: 'Minimal' })
const { $api } = useNuxtApp()
const search = ref('')
const queryClient = useQueryClient()
const tab = ref('one')

const queryBuilder = ref({
  filters: {
    q: search.value,
  },
  sorts: ['-created_at'],
  page: 1,
  limit: 4,
})

const {items, totalItems, isLoading, isFetching, refetch, totalPages} = useGetProducts(queryBuilder)

const changePage = (page: number) => {
  console.log(page)
  queryBuilder.value.page = page
  queryClient.invalidateQueries('products')
}

const onSearch = () => {
  queryBuilder.value.filters.q = search.value
  queryClient.invalidateQueries('products')
}

const onReset = () => {
  search.value = ''
  queryBuilder.value.filters.q = ''
  queryClient.invalidateQueries('products')
}
</script>

<template>
  <v-row class="mt-3">
    <v-col cols="12" lg="12">
      <v-card>
        <v-tabs v-model="tab" bg-color="secondary">
          <v-tab class="tw-font-bold" value="one">{{ $t('home.tabContent.allCondition') }}</v-tab>
        </v-tabs>

        <v-card-text class="tw-bg-secondary">
          <v-window v-model="tab">
            <v-window-item bg-color="secondary" value="one">
              <div class="tw-flex tw-flex-wrap">
                <v-text-field
                    v-model="search"
                    class="tw-m-2 tw-mr-1 tw-w-full md:tw-w-auto"
                    hide-details
                    label="Tên"
                    type="text"
                    variant="solo-filled"
                />
                <v-select
                    class="tw-m-2 tw-mr-1 tw-w-full md:tw-w-auto"
                    hide-details
                    :items="['10000000', '20000000']"
                    :label="$t('home.model.maxPrice')"
                    variant="solo-filled"
                />
                <v-btn class="tw-m-2 tw-uppercase" color="primary" height="50" variant="flat" width="200" @click="onSearch">
                  <v-icon color="white" size="24">mdi-magnify</v-icon>
                  <span class="tw-text-white tw-font-bold tw-ml-1">Search</span>
                </v-btn>
                <v-btn class="tw-mt-2 tw-uppercase" color="primary" height="50" variant="flat" @click="onReset">
                  <span>reset</span>
                </v-btn>
              </div>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="12">
      <v-divider class="border-opacity-100" color="error" :thickness="4" />
    </v-col>
  </v-row>
  <v-card class="inside-left-sidebar rounded-md overflow-hidden" elevation="10">
    <div class="d-flex mainbox">
      <div class="right-part">
        <perfect-scrollbar>
          <v-sheet class="pa-4">
            <div class="d-flex gap-2 align-center mb-4">
              <h5 class="text-h5 d-none d-lg-flex">Products</h5>
            </div>
            <v-row v-if="items.length >= 1">
              <v-col v-for="product in items" :key="product.id" cols="12" lg="3" sm="6">
                <product-item-vue
                    :id="product.id"
                    :name="product.name"
                    :description="product.description"
                    :unit="product.unit"
                    :manufacturer_name="product.manufacturer"
                    :image="product.productImages[0].path"
                    :lastPrice="product.lastPrice"
                />
              </v-col>
            </v-row>
            <product-emplty v-else />
          </v-sheet>
        </perfect-scrollbar>
        <v-pagination
            v-model="page"
            :length="totalPages"
            @update:model-value="changePage"
        ></v-pagination>
      </div>
    </div>
  </v-card>
</template>
<style lang="scss">
.mainbox {
  position: relative;
  overflow: hidden;
}
.left-part {
  width: 320px;
  border-right: 1px solid rgb(var(--v-theme-borderColor));
  min-height: 500px;
  transition: 0.1s ease-in;
  flex-shrink: 0;
}
.v-theme--light {
  .left-part {
    background: white;
  }
}
.v-theme--dark {
  .left-part {
    background: #2b2b2b;
  }
}
.right-part {
  width: 100%;
  min-height: 500px;
  position: relative;
}
</style>