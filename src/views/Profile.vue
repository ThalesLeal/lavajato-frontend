<template>
  <div class="profile">
    <h2>Perfil do Usuário</h2>
    <div v-if="loading">
      <p>Carregando...</p>
    </div>
    <div v-else>
      <p><strong>Nome:</strong> {{ user.nome }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Telefone:</strong> {{ user.telefone }}</p>
      <p><strong>Data de Cadastro:</strong> {{ user.data_cadastro }}</p>
      <button class="btn-voltar" @click="voltarDashboard">Voltar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {},
      loading: true,
    };
  },
  async created() {
    try {
      // Recupera o ID do cliente do localStorage
      const id = localStorage.getItem("clienteId");
      if (!id) {
        alert("ID do cliente não encontrado.");
        this.$router.push("/login");
        return;
      }
      // Busca os dados do cliente no backend
      const response = await axios.get(
        `http://127.0.0.1:8000/api/auth/profile/${id}/`
      );
      this.user = response.data;
    } catch (error) {
      console.error("Erro ao carregar perfil:", error.response?.data || error);
      alert("Erro ao carregar perfil.");
      this.$router.push("/login");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    voltarDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}
.btn-voltar {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
