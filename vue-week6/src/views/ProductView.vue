<template>
  <h2>單一產品</h2>
  <div class="container">
      <!-- row 決定內層的數量 -->
    <div class="row row-clos-1 row-cols-lg-4 g-3">
        <!-- 內層不定義寬度 -->
      <div class="col">
          <!-- h-高度 -->
        <div class="card h-100" >
          <img :src="product.imageUrl" class="card-img-top" alt="product.title" />
          <div class="card-body">
            <h5 class="card-title">{{product.title}}</h5>
            <p class="card-text">
             {{product.description}}
            </p>
          </div>
          <div class="footer px-3">
             <input type="button"  @click="goBack" class="btn btn-primary" value="上一頁" />
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
      product: {},
    };
  },
  methods: {
    getProduts() {
      const { id } = this.$route.params;
      this.$http(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getProduts();
  },
};
</script>
