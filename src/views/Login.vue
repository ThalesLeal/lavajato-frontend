<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Usuário</label>
        <input
          v-model="form.username"
          type="text"
          id="username"
          placeholder="Digite seu usuário"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p>
      Não tem conta?
      <router-link to="/register">Cadastre-se</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/login/",
          this.form
        );
        // Salva o token no localStorage para uso em requisições autenticadas
        localStorage.setItem("token", response.data.token);
        // Redireciona para o perfil ou dashboard
        this.$router.push("/profile");
      } catch (error) {
        console.error(error);
        alert("Erro no login: " + error.response.data.detail);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}
</style>
