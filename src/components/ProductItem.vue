<template>
  <div>
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price}} ₽
    </span>

    <color-list :color-show-list="product.colors" v-model="color" :highlight-black="true"/>
  </div>
</template>

<script>
import ColorList from './ColorList.vue';

export default {
  data() {
    return {
      color: 0,
    };
  },
  components: { ColorList },
  props: ['product'],
};
</script>
