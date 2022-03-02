<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active navbar-brand" to="/">前台</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link navbar-brand" to="/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link navbar-brand" to="/cart">購物車</router-link>
          </li>
        </ul>
      </div>
      <router-link class="btn btn-primary mx-3" to="login">登入</router-link>
      <button type="button" class="btn btn-primary">
        結帳
        <span class="badge rounded-pill bg-danger m">{{ cart.carts.length }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      cart: {
        carts: [],
      },
    };
  },
  components: {},
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((response) => {
          this.cart = response.data.data;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getCart();
    emitter.on('get-cart', () => {
      this.getCart();
    });
  },
};
</script>
