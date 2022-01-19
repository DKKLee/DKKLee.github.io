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
                const { success } = res.data;
                if (success) { this.getData(); };
            }).catch((err) => {
                alert(err.data.message);
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
        DelData: function (id) {
            //選項刪除
            const api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
            axios.delete(api).then((res) => {
                const { success } = res.data;
                if (success) { 
                    this.getData(); 
                    alert('刪除成功');
                };
            }).catch((err) => {
                alert(err.data.message);
            });
        }
    },
    mounted() {
        // 取出 Token
        // 利用助教上課的方式  解析不出來???
        //const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        const token = document.cookie.split('henToken=')[1];
        axios.defaults.headers.common.Authorization = token;

        this.checkLogin()
    }
});

App.mount("#app");