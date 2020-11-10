<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{numberOfProductsLabel}}
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter v-bind.sync="filters"/>

      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">
          Ошибка при загрузке товаров
          <button @click.prevent="loadProducts()">Попробовать еще раз</button>
        </div>
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import numberOfProducts from '@/helpers/numberOfProducts';
import axios from 'axios';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filters: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: '',
      },
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
          colors: product.colors.map((color) => color.id),
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    numberOfProductsLabel() {
      return numberOfProducts(this.countProducts);
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      setTimeout(() => {
        clearTimeout(this.loadProductsTimer);
        axios.get(
          '/api/products',
          {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filters.categoryId,
              minPrice: this.filters.priceFrom,
              maxPrice: this.filters.priceTo,
              colorId: this.filters.colorId,
            },
          },
        )
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      },
      0);
    },
    numberOfProducts,
  },
  watch: {
    page() {
      this.loadProducts();
    },
    // eslint-disable-next-line
    'filters.priceFrom': function () {
      this.loadProducts();
    },
    // eslint-disable-next-line
    'filters.priceTo': function () {
      this.loadProducts();
    },
    // eslint-disable-next-line
    'filters.categoryId': function () {
      this.loadProducts();
    },
    // eslint-disable-next-line
    'filters.colorId': function () {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
