<template>
  <ul class="colors">
    <li
      class="colors__item"
      v-for="color in currentColorList"
      :key="color.id"
    >
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :value="color.id"
          v-model="colorSel"
        >
        <span class="colors__value" :style="{backgroundColor: color.value}">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  model: {
    prop: 'colorId',
    event: 'update-color-id',
  },
  props: ['colorShowList', 'colorId'],
  data() {
    return {
      colorSel: this.colorId,
      colorData: null,
    };
  },
  computed: {
    currentColorList() {
      if (!this.colorData) {
        return [];
      }
      if (this.colorShowList != null) {
        /* я попробовал поставить условие if (this.colorShowList) -
        в консоли пишет warning colorShowList is null */
        return this.colorData.filter((color) => this.colorShowList.indexOf(color.id) >= 0);
      }
      return this.colorData;
    },
  },
  watch: {
    colorId(value) {
      this.colorSel = value;
    },
    colorSel(value) {
      this.$emit('update-color-id', value);
    },
  },
  methods: {
    loadColors() {
      axios.get('/api/colors')
        .then((response) => {
          this.colorData = response.data.items.map((color) => ({ ...color, value: color.code }));
        })
        .catch((error) => console.log(error));
    },
  },
  created() {
    this.loadColors();
  },
};
</script>
