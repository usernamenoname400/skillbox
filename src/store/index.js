import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const productItem = state.cartProducts.find((item) => item.productId === productId);

      if (productItem) {
        productItem.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        let product = state.cartProductsData.find(
          (prod) => prod.product.id === item.productId,
        );
        // Если сделать получение .product в цепочке фильтра, то ругается eslint
        product = product.product;

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0,
      );
    },
  },
  actions: {
    loadCart(context) {
      return axios.get('/api/baskets', { params: { userAccessKey: context.state.userAccessKey } })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accesskey);
            context.commit('updateUserAccessKey', response.data.user.accesskey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return axios.post(
        '/api/baskets/products',
        {
          productId,
          quantity: amount,
        },
        {
          params: { userAccessKey: context.state.userAccessKey },
        },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return null;
      }

      return axios.put(
        '/api/baskets/products',
        {
          productId,
          quantity: amount,
        },
        {
          params: { userAccessKey: context.state.userAccessKey },
        },
      )
        .then((response) => { context.commit('updateCartProductsData', response.data.items); })
        .catch(() => { context.commit('syncCartProducts'); });
    },
    deleteCartProduct(context, productId) {
      return axios.delete(
        '/api/baskets/products',
        {
          data: { productId },
          params: { userAccessKey: context.state.userAccessKey },
        },
      )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => { context.commit('syncCartProducts'); });
    },
  },
});
