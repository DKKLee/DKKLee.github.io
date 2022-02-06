import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const App = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            user: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        Login() {
            console.log('Login');
            const api = `${this.apiUrl}/admin/signin`;
            axios.post(api, this.user).then((res) => {
                const { token, expired } = res.data;
                document.cookie = `hexToken=${token};expires=${new Date(expired)};path=/;`;
                window.location = "./products.html";
            }).catch((err) => {
                alert(err.data.message);
            });
        }
    },
    mounted() {

    },
});

App.mount("#app");