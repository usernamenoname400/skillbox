<template>
  <div>
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: {id: product.id} }"
    >
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: {id: product.id} }">
        {{product.title}}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{product.price | numberFormat}} ₽
    </span>

    <div class="colors--black">
      <color-list :color-show-list="product.colors" v-model="color"/>
    </div>
  </div>
</template>

<script>
import ColorList from '@/components/ColorList.vue';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      color: 0,
    };
  },
  filters: {
    numberFormat,
  },
  components: { ColorList },
  props: ['product'],
  methods: {
    gotoPage,
  },
};
</script>
