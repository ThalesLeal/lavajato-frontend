<template>
  <div class="admin-panel">
    <h2>Painel Administrativo</h2>
    <div v-if="loading">
      <p>Carregando agendamentos...</p>
    </div>
    <div v-else>
      <h3>Agendamentos</h3>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Cliente</th>
            <th>Carro</th>
            <th>Placa</th>
            <th>Tipo de Lavagem</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(agendamento, index) in agendamentos" :key="index">
            <td>{{ agendamento.data }}</td>
            <td>{{ agendamento.cliente }}</td>
            <td>{{ agendamento.carro }}</td>
            <td>{{ agendamento.placa }}</td>
            <td>{{ agendamento.tipo_lavagem }}</td>
            <td>{{ agendamento.valor }}</td>
          </tr>
        </tbody>
      </table>
      <button class="btn-voltar" @click="voltarDashboard">
        Voltar ao Dashboard
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminPanel",
  data() {
    return {
      agendamentos: [],
      loading: true,
    };
  },
  async created() {
    try {
      // Chamada para o endpoint que retorna os agendamentos
      // Exemplo: GET http://127.0.0.1:8000/api/core/agendamentos/
      const response = await axios.get(
        "http://127.0.0.1:8000/api/core/agendamentos/"
      );
      this.agendamentos = response.data;
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
      alert("Erro ao carregar os agendamentos.");
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
.admin-panel {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.btn-voltar {
  padding: 0.5rem 1rem;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
