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
import colorsList from '../data/colors';

export default {
  model: {
    prop: 'colorVal',
    event: 'update-color-val',
  },
  props: ['colorShowList', 'colorVal'],
  data() {
    return {
      colorSel: this.colorVal,
    };
  },
  computed: {
    currentColorList() {
      if (this.colorShowList != null) {
        /* я попробовал поставить условие if (this.colorShowList) -
        в консоли пишет warning colorShowList is null */
        return colorsList.filter((color) => this.colorShowList.indexOf(color.id) >= 0);
      }
      return colorsList;
    },
  },
  watch: {
    colorVal(value) {
      this.colorSel = value;
    },
    colorSel(value) {
      this.$emit('update-color-val', value);
    },
  },
};
</script>
