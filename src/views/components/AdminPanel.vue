<template>
  <div class="admin-panel">
    <h2>Painel Administrativo</h2>
    <div class="admin-vagas">
      <h3>Gerenciar Vagas</h3>
      <form @submit.prevent="salvarVaga">
        <div>
          <label>Data:</label>
          <input type="date" v-model="vaga.data" required />
        </div>
        <div>
          <label>Hora Início:</label>
          <input type="time" v-model="vaga.hora_inicio" required />
        </div>
        <div>
          <label>Hora Fim:</label>
          <input type="time" v-model="vaga.hora_fim" required />
        </div>
        <div>
          <label>Quantidade de Vagas:</label>
          <input type="number" v-model="vaga.quantidade" required />
        </div>
        <button type="submit">Salvar</button>
      </form>
      <div class="lista-vagas">
        <h4>Vagas Cadastradas</h4>
        <ul>
          <li v-for="vaga in vagas" :key="vaga.id">
            {{ vaga.data }}: {{ vaga.hora_inicio }} - {{ vaga.hora_fim }} ({{
              vaga.quantidade
            }}
            vagas)
          </li>
        </ul>
      </div>
    </div>
    <ChatWhatsApp />
  </div>
</template>

<script>
import axios from "axios";
import ChatWhatsApp from "./ChatWhatsApp.vue";

export default {
  name: "AdminPanel",
  components: { ChatWhatsApp },
  data() {
    return {
      vaga: {
        data: "",
        hora_inicio: "",
        hora_fim: "",
        quantidade: 0,
      },
      vagas: [],
    };
  },
  methods: {
    async fetchVagas() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/vagas/");
        this.vagas = response.data;
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    },
    async salvarVaga() {
      try {
        await axios.post("http://127.0.0.1:8000/api/vagas/", this.vaga);
        this.fetchVagas();
        alert("Vaga cadastrada com sucesso!");
      } catch (error) {
        alert("Erro ao salvar vaga: " + error.response.data);
      }
    },
  },
  mounted() {
    this.fetchVagas();
  },
};
</script>

<style scoped>
.admin-panel {
  max-width: 600px;
  margin: 0 auto;
}
.admin-panel form div {
  margin-bottom: 1rem;
}
.lista-vagas {
  margin-top: 1rem;
}
</style>
