<template>
  <div class="calendar-container">
    <h2>Agendar Lavagem</h2>

    <div v-if="loading">
      <p>Carregando calendário...</p>
    </div>
    <div v-else>
      <!-- Se nenhum dia selecionado, exibe o calendário (segunda a sábado) -->
      <div v-if="!selectedDay">
        <h3>Calendário (Segunda a Sábado)</h3>
        <table class="calendar-table">
          <thead>
            <tr>
              <th>Seg</th>
              <th>Ter</th>
              <th>Qua</th>
              <th>Qui</th>
              <th>Sex</th>
              <th>Sáb</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, wIndex) in weeks" :key="wIndex">
              <td
                v-for="(dayObj, dIndex) in week"
                :key="dIndex"
                class="calendar-day"
                @click="selectDay(dayObj)"
              >
                <!-- Se houver um dia, mostra apenas o número do dia -->
                <div v-if="dayObj" class="day-card">
                  <span class="day-number">{{
                    getDayNumber(dayObj.date)
                  }}</span>
                </div>
                <!-- Caso não haja dia (célula vazia) -->
                <div v-else class="empty-day"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Se um dia foi selecionado, mostra os horários -->
      <div v-else>
        <h3>Horários para {{ selectedDay.date }}</h3>
        <div class="time-slots">
          <div
            v-for="slot in selectedDay.times.filter((s) => !s.ocupado)"
            :key="slot.id"
            class="time-slot"
          >
            <button @click="confirmarAgendamento(selectedDay, slot)">
              {{ slot.hora }}
            </button>
          </div>
          <p v-if="selectedDay.times.every((s) => s.ocupado)">
            Nenhum horário disponível para este dia.
          </p>
        </div>
        <button class="btn-back" @click="selectedDay = null">
          Voltar ao calendário
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserScheduling",
  data() {
    return {
      weeks: [], // Matriz de semanas, cada semana é um array de 6 colunas (segunda..sábado)
      selectedDay: null, // Dia selecionado
      loading: true, // Indica se está carregando os dados do backend
    };
  },
  async created() {
    try {
      // Busca a matriz de semanas (cada sub-array = [dayObj, dayObj, ... 6 colunas])
      const resp = await axios.get(
        "http://127.0.0.1:8000/api/available_slots/"
      );
      this.weeks = resp.data; // Ex: [ [ {date, times}, {date, times}, ... ], ... ]
    } catch (error) {
      console.error("Erro ao carregar calendário:", error);
      alert("Erro ao carregar calendário.");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    selectDay(dayObj) {
      // Se a célula for vazia (null), não faz nada
      if (!dayObj) return;
      this.selectedDay = dayObj;
    },
    getDayNumber(dateStr) {
      // Extrai apenas o número do dia, ex: "2025-02-03" => 3
      const d = new Date(dateStr);
      return d.getDate();
    },
    async confirmarAgendamento(dayObj, slot) {
      const confirmar = confirm(
        `Deseja agendar dia ${dayObj.date} às ${slot.hora}?`
      );
      if (!confirmar) return;

      try {
        await axios.post("http://127.0.0.1:8000/api/agendar/", {
          date: dayObj.date,
          hora: slot.hora,
        });
        alert("Agendamento concluído!");
        slot.ocupado = true;
        // Volta ao calendário
        this.selectedDay = null;
      } catch (error) {
        console.error("Erro ao agendar:", error);
        alert("Erro ao agendar horário.");
      }
    },
  },
};
</script>

<style scoped>
/* Container principal */
.calendar-container {
  max-width: 900px;
  margin: 2rem auto;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
  background-color: #fff; /* Fundo branco */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Estado de carregamento */
.loading-state {
  font-size: 1.1rem;
  color: #555;
}

/* Título */
h2 {
  margin-bottom: 1rem;
}

/* Tabela do calendário */
.calendar-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.calendar-table th {
  background-color: #f2f2f2;
  font-weight: 600;
  color: #333;
  padding: 0.5rem;
  text-transform: capitalize;
}
.calendar-table td {
  border: 1px solid #ddd;
  height: 80px;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
}

/* Quando passar o mouse na célula */
.calendar-day:hover {
  background-color: #e6f2ff; /* Azul claro pastel */
}

/* Card do dia */
.day-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* Número do dia */
.day-number {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

/* Célula vazia */
.empty-day {
  height: 100%;
  background-color: #fafafa;
}

/* Container de horários */
.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
}

/* Botões de horário */
.time-slot button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.time-slot button:hover {
  background-color: #0056b3;
}

/* Botão de voltar */
.btn-back {
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #aaa;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-back:hover {
  background-color: #888;
}
</style>
