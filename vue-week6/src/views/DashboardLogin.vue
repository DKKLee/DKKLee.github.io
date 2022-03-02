<template>
<div class="body">
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="Login">
          <div class="mb-3">
            <label for="username"
              ><input
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                v-model="user.username"
              />
            </label>
          </div>
          <div class="mb-3">
            <label for="password"
              ><input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
                v-model="user.password"
            /></label>
          </div>
          <button class="btn btn-lg btn-primary w-50 mt-1" type="submit">登入</button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2022~∞ - DDDDK</p>
  </div>
  </div>
</template>
<style>

.body {
  padding-top: 10%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    Login() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};path=/;`;
          window.location = '#admin';
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
};
</script>
