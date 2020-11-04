<template>
  <div>
    <a
      class="catalog__pic"
      href="#"
      @click.prevent="gotoPage('product', {id: product.id})"
    >
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
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
