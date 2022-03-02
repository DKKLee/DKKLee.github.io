<template>
  <div class="container">
    <h2>購物車</h2>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <div
              style="height: 100px; background-size: cover; background-position: center"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
            <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
            <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="getProduct(item.id)"
                :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled"
              >
                <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(item.id)"
                :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled"
              >
                <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button" @click="deleteAllCarts">
        清空購物車
      </button>
    </div>
  </div>
  <userProductModal
    ref="userProductModal"
    :product="product"
    @addToCart="addToCart"
  ></userProductModal>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Launch demo modal
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    @click="modal.show()"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';
import userProductModal from '@/components/userProductModal.vue';

export default {
  data() {
    return {
      products: [],
      product: '',
      cart: {},
      loadingStatus: {
        loadingItem: '',
      },
    };
  },
  components: {
    userProductModal,
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http
        .get(url)
        .then((response) => {
          const { products } = response.data;
          this.products = products;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    getProduct(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.loadingStatus.loadingItem = id;
      this.$http
        .get(url)
        .then((response) => {
          this.product = response.data.product;
          this.$refs.userProductModal.openModal();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id;
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((res) => {
          console.log(res);
          this.isLoadingItem = '';
          // get-cart
          emitter.emit('get-cart');
        });
    },
    deleteAllCarts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then((response) => {
          alert(response.data.message);
          // get-cart
          emitter.emit('get-cart');
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    openWindows() {
      alert(111);
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
