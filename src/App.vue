<template>
  <div>
    <CommonHeader/>

    <router-view/>

    <CommonFooter/>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonFooter from '@/components/CommonFooter.vue';
import { mapMutations } from 'vuex';

export default {
  components: { CommonHeader, CommonFooter },
  methods: {
    ...mapMutations(['updateUserAccessKey']),
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
  },
};
</script>
