<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">建立新的產品</button>
    </div>
    <table class="table table-hover mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="150">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price }}</td>
          <td>{{ item.price }}</td>
          <td>
            <span @onClick="updatastate()" :class="{ 'text-success': item.is_enabled }">{{
              item.is_enabled ? '啟用' : '未啟用'
            }}</span>
          </td>
          <td width="120" class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent :pages="pagination" @emit-pages="getData"></PaginationComponent>
  </div>
</template>

<script>
import PaginationComponent from '../components/PaginationComponent.vue';

export default {
  data() {
    return {
      products: [],
      selectItem: {},
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
    };
  },
  components: {
    PaginationComponent,
  },
  methods: {
    getData(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
          console.log(pagination);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    updatastate() {
      this.selectItem.is_enabled = !this.selectItem.is_enabled;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.selectItem.id}`;
      this.$http
        .put(api, { data: this.selectItem })
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.getData();
  },
};
</script>
