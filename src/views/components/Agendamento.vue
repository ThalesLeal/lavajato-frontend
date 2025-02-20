<template>
  <div class="agendamento">
    <h2>Agendar Lavagem</h2>
    <form @submit.prevent="submitAgendamento">
      <div>
        <label>Data:</label>
        <input type="date" v-model="form.data_agendamento" required />
      </div>
      <div>
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
      <div>
        <label>Tipo de Lavagem:</label>
        <select v-model="form.lavagem_id" required>
          <option
            v-for="lavagem in lavagens"
            :key="lavagem.id"
            :value="lavagem.id"
          >
            {{ lavagem.nome }} - R$ {{ lavagem.preco }}
          </option>
        </select>
      </div>
      <div>
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
      horariosDisponiveis: ["08:00", "09:00", "10:00", "11:00"],
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
        const lavagensResponse = await axios.get(
          "http://127.0.0.1:8000/api/lavagens/"
        );
        this.lavagens = lavagensResponse.data;

        const extrasResponse = await axios.get(
          "http://127.0.0.1:8000/api/extras/"
        );
        this.extras = extrasResponse.data;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    },
    async submitAgendamento() {
      try {
        await axios.post("http://127.0.0.1:8000/api/agendamentos/", this.form);
        alert("Agendamento realizado com sucesso!");
      } catch (error) {
        alert("Erro ao agendar: " + error.response.data);
      }
    },
  },
  mounted() {
    this.fetchDados();
  },
};
</script>

<style scoped>
/* Estilos específicos para o componente */
.agendamento {
  max-width: 500px;
  margin: 0 auto;
}
.agendamento form div {
  margin-bottom: 1rem;
}
</style>
