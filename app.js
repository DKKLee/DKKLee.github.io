import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

        const App = createApp({
            data() {
                return {
                    user: {
                        username: "",
                        password: "",
                    }
                };
            },
            methods: {
                Login() {
                    console.log('Login');
                    const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
                    axios.post(api, this.user).then((res) => {
                            console.log(res.data);
                            const { token, expired } = res.data;
                            document.cookie = `henToken=${token};expires=${new Date(expired)};path=/;`;
                            window.location = "./Products.html";
                        }).catch((err) => {
                            alert(err.data.message);
                        });
                },
                checkLogin(){
                    const api = "https://vue3-course-api.hexschool.io/v2/api/user/check";
                    axios.post(api).then((res) => {

                        }).catch((err) => {
                            alert(err.data.message);
                        });
                }
            },
            created() {
                //const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,'');
                const token = document.cookie.split('henToken=')[1];
                axios.defaults.headers.common.Authorization = token;
            }
        });

        App.mount("#app");