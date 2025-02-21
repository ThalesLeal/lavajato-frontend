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
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        // Envia email e password para o endpoint de login
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/login/",
          this.form
        );
        // Supondo que o backend retorne { id, email, nome, telefone }
        localStorage.setItem("clienteId", response.data.id);
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
