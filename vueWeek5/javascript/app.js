import userProductModal from '../components/userProductModal.js';
import paginationConponent from "../components/pagination.js";

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max, regex } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('regex', regex);

loadLocaleFromURL('zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});


const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'vuetestproducts';

Vue.createApp({
  data() {
    return {
      loadingStatus: {
        loadingItem: '',
      },
      products: [],
      product: {},
      pagination: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {},
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
    userProductModal,
    paginationConponent,
  },
  methods: {
    getProducts(page = 1) {
      const url = `${apiUrl}/api/${apiPath}/products?page=${page}`;
      axios.get(url).then((response) => {
        const {products, pagination} = response.data
        this.products = products;
        this.pagination = pagination;
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    getProduct(id) {
      const url = `${apiUrl}/api/${apiPath}/product/${id}`;
      this.loadingStatus.loadingItem = id;
      axios.get(url).then((response) => {
        this.loadingStatus.loadingItem = '';
        this.product = response.data.product;
        this.$refs.userProductModal.openModal();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    addToCart(id, qty = 1) {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };

      this.$refs.userProductModal.hideModal();
      axios.post(url, { data: cart }).then((response) => {
        alert(response.data.message);
        this.loadingStatus.loadingItem = '';
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    updateCart(data) {
      this.loadingStatus.loadingItem = data.id;
      const url = `${apiUrl}/api/${apiPath}/cart/${data.id}`;
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };
      axios.put(url, { data: cart }).then((response) => {
        alert(response.data.message);
        this.loadingStatus.loadingItem = '';
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
        this.loadingStatus.loadingItem = '';
      });
    },
    deleteAllCarts() {
      const url = `${apiUrl}/api/${apiPath}/carts`;
      axios.delete(url).then((response) => {
        alert(response.data.message);
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    getCart() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios.get(url).then((response) => {
        this.cart = response.data.data;
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    removeCartItem(id) {
      const url = `${apiUrl}/api/${apiPath}/cart/${id}`;
      this.loadingStatus.loadingItem = id;
      axios.delete(url).then((response) => {
        alert(response.data.message);
        this.loadingStatus.loadingItem = '';
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    createOrder() {
      const url = `${apiUrl}/api/${apiPath}/order`;
      const order = this.form;
      axios.post(url, { data: order }).then((response) => {
        alert(response.data.message);
        this.$refs.form.resetForm();
        this.$refs.message.value = '';
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
})
  .mount('#app');
