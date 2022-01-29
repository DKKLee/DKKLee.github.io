import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const App = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'vuetestproducts',
            products: [],
            selectItem: {},
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
        delData(id) {
            //選項刪除
            const api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
            axios.delete(api).then((res) => {
                this.getData(); 
            }).catch((err) => {
                alert(err.data.message);
            });
        }
    },
    mounted() {
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.checkLogin()
    }
});

App.mount("#app");