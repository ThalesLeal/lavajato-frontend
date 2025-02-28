<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          placeholder="Digite seu email"
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
    <p>Não tem conta? <router-link to="/register">Cadastre-se</router-link></p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        // Chama o endpoint correto: /auth/token/ (definido em auth_urls.py)
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/token/",
          this.form
        );
        console.log("Token recebido:", response.data.access);
        localStorage.setItem("token", response.data.access);
        this.$router.push("/dashboard");
      } catch (error) {
        console.error(error);
        alert(
          "Erro no login: " +
            (error.response?.data?.detail || "Erro desconhecido.")
        );
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
  text-align: center;
  background-color: #f7f7f7;
}
.form-group {
  margin-bottom: 1rem;
  text-align: left;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 0.5rem;
  background-color: #142b44;
  border: none;
  color: #f8c253;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
}
button:hover {
  background-color: #1d3a5f;
}
</style>
