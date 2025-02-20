<template>
  <div class="register-container">
    <h2>Cadastro</h2>
    <form @submit.prevent="register">
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
      <button type="submit">Cadastrar</button>
    </form>
    <p>
      Já tem conta?
      <router-link to="/login">Faça login</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRegister",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("http://127.0.0.1:8000/api/auth/register/", this.form);
        alert("Usuário criado com sucesso!");
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar: " + error.response.data.detail);
      }
    },
  },
};
</script>

<style scoped>
.register-container {
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
  background-color: #28a745;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}
</style>
