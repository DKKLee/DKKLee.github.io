import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

let productModal = null;
let delProductModal = null;

const App = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'vuetestproducts',
            products: [],
            selectItem: {},
            tempProduct: {
                imagesUrl: [],
            },
            pagination: {},
        };
    },
    methods: {
        checkLogin() {
            const api = `${this.apiUrl}/api/user/check`;
            axios.post(api).then((res) => {
                this.getData();
            }).catch((err) => {
                window.location = "./index.html";
            });
        },
        getData(page = 1) {
            const api = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
            axios.get(api).then((res) => {
                const { products, pagination } = res.data;
                this.products = products;
                this.pagination = pagination;
            }).catch((err) => {
                alert(err.data);
                window.location = 'index.html';
            });
        },
        updateData() {
            //新增/編輯資料
            let httpmethod = this.tempProduct.id ? 'put' : 'post';
            let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            api += this.tempProduct.id ? `/${this.tempProduct.id}` : '';

            axios[httpmethod](api, { data: this.tempProduct }).then((res) => {
                this.getData();
                productModal.hide();
            }).catch((err) => {
                alert(err.data.message);
            });
        },
        delData() {
            //選擇資料
            const id = this.tempProduct.id;
            const api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
            axios.delete(api).then((res) => {
                this.getData();
                delProductModal.hide();
            }).catch((err) => {
                alert(err.data.message);
            });
        },
        openModal(openType, item) {
            if (openType === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                productModal.show();
            } else if (openType === 'edit') {
                this.tempProduct = { ...item };
                productModal.show();
            } else if (openType === 'delete') {
                this.tempProduct = { ...item };
                delProductModal.show();
            }

        }
    },
    mounted() {
        //建立新增/編輯模板
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        //建立刪除模板
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });
        // 取出 Token
        axios.defaults.headers.common.Authorization = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.checkLogin()
    }
});

// 分頁元件
App.component('pagination', {
    template: '#pagination',
    props: ['pages'],
    methods: {
        emitPages(item) {
            this.$emit('emit-pages', item);
        },
    },
});

// 產品新增/編輯元件
App.component('productModal', {
    template: '#productModal',
    props: ['product'],
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'vuetestproducts',
            modal: null,
        };
    },
    mounted() {
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false,
            backdrop: 'static'
        });
    },
    methods:{
        updateData() {
            //新增/編輯資料
            let httpmethod = this.product.id ? 'put' : 'post';
            let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            api += this.product.id ? `/${this.product.id}` : '';

            axios[httpmethod](api, { data: this.product }).then((res) => {
                productModal.hide();
                this.$emit('update');
            }).catch((err) => {
                alert(err.data.message);
            });
        },
        createImages() {
            this.product.imagesUrl = [];
            this.product.imagesUrl.push('');
          },
    }

});

// 產品刪除元件
App.component('delProductModal',{
    template: '#delProductModal',
  props: ['product'],
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'vuetestproducts',
      modal: null,
    };
  },
  mounted() {
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    delData() {
        //選擇資料
        const id = this.product.id;
        const api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
        axios.delete(api).then((res) => {
            delProductModal.hide();
            this.$emit('update');
        }).catch((err) => {
            alert(err.data.message);
        });
    },
  }
});

App.mount("#app");