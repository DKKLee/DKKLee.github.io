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
        getData() {
            const api = `${this.apiUrl}/api/${this.apiPath}/admin/products`
            axios.get(api).then((res) => {
                this.products = res.data.products;
            }).catch((err) => {
                alert(err.data.message);
            });
        },
        updateData() {
            //新增/編輯資料
            let httpmethod = this.tempProduct.id ? 'put':'post';
            let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            api += this.tempProduct.id ? `/${this.tempProduct.id}`:''; 

            axios[httpmethod](api, {data:this.tempProduct}).then((res) => {
                this.getData(); 
                productModal.hide();
            }).catch((err) => {
                alert(err.data.message);
            });
        },
        delData() {
            //選項資料
           
            const id = this.tempProduct.id;
            const api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
            axios.delete(api).then((res) => {
                this.getData(); 
                delProductModal.hide();
            }).catch((err) => {
                alert(err.data.message);
            });
        },
        openModal(openType, item){
            if(openType === 'new'){
                this.tempProduct = {
                    imagesUrl : [],
                };
                productModal.show();
            }else if (openType === 'edit'){
                this.tempProduct = {...item};
                productModal.show();
            }else if (openType === 'delete'){
                this.tempProduct = {...item};
                delProductModal.show();
            }
            
        }
    },
    mounted() {
        //建立新增/編輯模板
        productModal = new bootstrap.Modal(document.getElementById('productModal'),{
            keyboard: false
        });
        //建立刪除模板
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'),{
            keyboard: false
        });
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.checkLogin()
    }
});

App.mount("#app");