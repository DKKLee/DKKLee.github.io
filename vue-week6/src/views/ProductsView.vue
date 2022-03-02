<template>
  <div class="container">
    <!-- row 決定內層的數量 -->
    <div class="row row-clos-1 row-cols-lg-4 g-3">
      <!-- 內層不定義寬度 -->
      <div class="col" v-for="item in products" :key="item.id">
        <!-- h-高度 -->
        <div class="card h-100">
          <img :src="item.imageUrl" class="card-img-top" alt="item.title" />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">
              {{ item.description }}
            </p>
          </div>
          <div class="footer px-3">
            <router-link :to="`/product/${item.id}`" class="btn btn-primary">
              Go somewhere
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      product: {},
    };
  },
  methods: {
    getProduts() {
      this.$http(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getProduts();
  },
};
</script>
