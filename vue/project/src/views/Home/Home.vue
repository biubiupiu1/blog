<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ul>
      <button @click="test">测试</button>
      <li v-for="item in list" :id="item" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/helloWorld/helloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5]
    };
  },
  created() {},
  methods: {
    test() {
      this.list = [4, 1, 3, 5, 2];
    }
  }
};
</script>
