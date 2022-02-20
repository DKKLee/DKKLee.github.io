import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'vuetestproducts';
let productModal = null;
let delProductModal = null;

import paginationConponent from "../components/pagination.js";
import productConponent from "../components/productModal.js";
import delproductConponentl from "../components/delproductModal.js";

const App = createApp({
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
        paginationConponent,
        productConponent,
        delproductConponentl,
    },
    methods: {
        checkLogin() {
            // 取出 Token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common.Authorization = token;
            const api = `${apiUrl}/api/user/check`;
            axios.post(api).then((res) => {
                this.getData();
            }).catch((err) => {
                window.location = "./index.html";
            });
        },
        getData(page = 1) {
            const api = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;
            axios.get(api).then((res) => {
                const { products, pagination } = res.data;
                console.log(products);
                this.products = products;
                this.pagination = pagination;
            }).catch((err) => {
                alert(err.data);
                window.location = 'index.html';
            });
        },
        updatastate(item){
            item.is_enabled = !item.is_enabled;
            console.log(item.id);
            let api = `${apiUrl}/api/${apiPath}/admin/product/${item.id}`;
            axios.put(api, { data: item }).then((res) => {
              
            }).catch((err) => {
                alert(err.data.message);
            });
        },
        updateData() {
            //新增/編輯資料
            let httpmethod = this.tempProduct.id ? 'put' : 'post';
            let api = `${apiUrl}/api/${apiPath}/admin/product`;
            api += this.tempProduct.id ? `/${this.tempProduct.id}` : '';
            axios[httpmethod](api, { data: this.tempProduct }).then((res) => {
                if(this.tempProduct.id ){
                    this.products.forEach((item,index) => {
                        if(item.id === this.tempProduct.id){
                            this.products[index] = {...this.tempProduct};
                        }
                    }) ;
                }else{
                    this.getData(); 
                }
                productModal.hide();
            }).catch((err) => {
                alert(err.data.message);
            });
        },
        delData() {
            //選擇資料
            const id = this.tempProduct.id;
            const api = `${apiUrl}/api/${apiPath}/admin/product/${id}`;
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
        this.checkLogin()
    }
});

// //分頁元件
// App.component('card1', {
//     template: '#pagination',
//     props: ['pages'],
//     methods: {
//         emitPages(item) {
//             this.$emit('emit-pages', item);
//         },
//     },
// });

// // 產品新增/編輯元件
// App.component('productModal', {
//     template: '#productModal',
//     props: ['product'],
//     data() {
//         return {
//             modal: null,
//         };
//     },
//     mounted() {
//         productModal = new bootstrap.Modal(document.getElementById('productModal'), {
//             keyboard: false,
//             backdrop: 'static'
//         });
//     },
//     methods: {
//         updateData() {
//             //新增/編輯資料
//             let httpmethod = this.product.id ? 'put' : 'post';
//             let api = `${apiUrl}/api/${apiPath}/admin/product`;
//             api += this.product.id ? `/${this.product.id}` : '';

//             axios[httpmethod](api, { data: this.product }).then((res) => {
//                 productModal.hide();
//                 this.$emit('update');
//             }).catch((err) => {
//                 alert(err.data.message);
//             });
//         },
//         createImages() {
//             this.product.imagesUrl = [];
//             this.product.imagesUrl.push('');
//         },
//     }

// });

// // 產品刪除元件
// App.component('delProductModal', {
//     template: '#delProductModal',
//     props: ['product'],
//     data() {
//         return {
//             modal: null,
//         };
//     },
//     mounted() {
//         delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
//             keyboard: false,
//             backdrop: 'static',
//         });
//     },
//     methods: {
//         delData() {
//             //選擇資料
//             const id = this.product.id;
//             const api = `${apiUrl}/api/${apiPath}/admin/product/${id}`;
//             axios.delete(api).then((res) => {
//                 delProductModal.hide();
//                 this.$emit('update');
//             }).catch((err) => {
//                 alert(err.data.message);
//             });
//         },
//     }
// });

App.mount("#app");