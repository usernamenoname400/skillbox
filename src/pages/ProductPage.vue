<template>
  <main class="content container" v-if="productsLoading">
    Загрузка товара....
  </main>
  <main class="content container" v-else-if="productsLoadingFailed">
    Ошибка при загрузке товара
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{category.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{product.title}}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image"
            :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
          {{product.title}}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{product.price | numberFormat}} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <color-list :color-show-list="product.colors" />
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item"
                    value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item"
                    value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item"
                    value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <AmountSpinner v-model="productAmount"/>

              <button
                class="button button--primery"
                type="submit"
                :disabled="productAddSending"
              >
                В корзину
              </button>
            </div>
          </form>
          <div v-if="productAdded">Товар добавлен в корзину</div>
          <div v-else-if="productAddSending">Добавляем товар в корзину в корзину</div>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br/>
            Синхронизация со смартфоном<br/>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br/>
            Поддержка сторонних приложений<br/>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
          </p>

          <h3>Дизайн</h3>

          <p>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import AmountSpinner from '@/components/AmountSpinner.vue';
import ColorList from '@/components/ColorList.vue';

export default {
  data() {
    return {
      productAmount: 1,
      productData: null,
      productsLoading: false,
      productsLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
      productAddError: false,
    };
  },
  components: {
    AmountSpinner,
    ColorList,
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      const result = this.productData;
      result.image = result.image.file.url;
      result.colors = result.colors.map((color) => color.id);
      return result;
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    gotoPage,
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => { this.productAdded = true; })
        .catch(() => {
          this.productAddError = true;
          this.productAdded = false;
        })
        .then(() => { this.productAddSending = false; });
    },
    loadProduct() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      axios.get(`/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data;
        })
        .catch(() => {
          this.productsLoadingFailed = true;
          this.$router.replace({ name: 'notfound', params: { 0: this.$route.path } });
        })
        .then(() => { this.productsLoading = false; });
    },
  },
  watch: {
    /* Без этой директивы, eslint-у не нравятся имена методов в кавычках */
    // eslint-disable-next-line
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
