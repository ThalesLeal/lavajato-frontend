<template>
  <div class="agendamento">
    <h2>Agendar Lavagem</h2>
    <form @submit.prevent="submitAgendamento">
      <div class="form-group">
        <label>Data:</label>
        <input type="date" v-model="form.data_agendamento" required />
      </div>
      <div class="form-group">
        <label>Horário:</label>
        <select v-model="form.horario" required>
          <option
            v-for="horario in horariosDisponiveis"
            :key="horario"
            :value="horario"
          >
            {{ horario }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Tipo de Lavagem:</label>
        <select v-model="form.lavagem_id" required>
          <option v-for="lav in lavagens" :key="lav.id" :value="lav.id">
            {{ lav.nome }} - R$ {{ lav.preco }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Extras:</label>
        <div v-for="extra in extras" :key="extra.id">
          <input type="checkbox" :value="extra.id" v-model="form.extras_ids" />
          <span>{{ extra.nome }} - R$ {{ extra.preco }}</span>
        </div>
      </div>
      <button type="submit">Agendar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AgendamentoView",
  data() {
    return {
      lavagens: [],
      extras: [],
      horariosDisponiveis: [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
      ],
      form: {
        data_agendamento: "",
        horario: "",
        lavagem_id: null,
        extras_ids: [],
      },
    };
  },
  methods: {
    async fetchDados() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Usuário não autenticado. Faça login.");
          this.$router.push("/login");
          return;
        }
        const lavResp = await axios.get(
          "http://127.0.0.1:8000/api/core/lavagens/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        this.lavagens = lavResp.data;
        const extResp = await axios.get(
          "http://127.0.0.1:8000/api/core/extras/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        this.extras = extResp.data;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Erro ao carregar lavagens/extras.");
        this.$router.push("/login");
      }
    },
    async submitAgendamento() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Usuário não autenticado. Faça login.");
          this.$router.push("/login");
          return;
        }
        await axios.post(
          "http://127.0.0.1:8000/api/core/agendamentos/",
          this.form,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        alert("Agendamento realizado com sucesso!");
        // Limpar o formulário
        this.form.data_agendamento = "";
        this.form.horario = "";
        this.form.lavagem_id = null;
        this.form.extras_ids = [];
      } catch (error) {
        console.error("Erro ao agendar:", error);
        const msg = error.response?.data?.detail || "Erro desconhecido";
        alert("Erro ao agendar: " + msg);
      }
    },
  },
  mounted() {
    this.fetchDados();
  },
};
</script>

<style scoped>
.agendamento {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.agendamento form .form-group {
  margin-bottom: 1rem;
}
label {
  display: inline-block;
  width: 140px;
  font-weight: 600;
  color: #333;
}
input[type="date"],
select {
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: calc(100% - 150px);
}
button[type="submit"] {
  padding: 0.6rem 1.2rem;
  background-color: #007bff;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
