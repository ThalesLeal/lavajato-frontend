<template>
  <div class="agendar">
    <!-- Logo no topo -->
    <div class="logo-container">
      <!-- Ajuste o caminho conforme onde sua imagem estiver (ex: "@/assets/logomarca.png") -->
      <img src="@/assets/logomarca.png" alt="Royal Carwash Logo" class="logo" />
    </div>

    <h2>Agendar Lavagem</h2>

    <!-- Se está carregando, mostra a mensagem -->
    <div v-if="loading" class="loading-state">
      <p>Carregando calendário...</p>
    </div>
    <div v-else>
      <!-- Calendário sempre visível -->
      <div class="calendar-header">
        <button class="btn-mes" @click="prevMonth">Anterior</button>
        <h3>{{ monthName }} de {{ currentYear }}</h3>
        <button class="btn-mes" @click="nextMonth">Próximo</button>
      </div>

      <div class="calendar-wrapper">
        <table class="calendar-table">
          <thead>
            <tr>
              <th v-for="(dia, idx) in weekDays" :key="idx">{{ dia }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, wIndex) in weeks" :key="wIndex">
              <td
                v-for="(day, dIndex) in week"
                :key="dIndex"
                :class="dayClass(day)"
                @click="selectCalendarDay(day)"
              >
                <span v-if="day.date">{{ day.date.getDate() }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Se um dia for selecionado, exibe os horários disponíveis e o formulário -->
      <div v-if="selectedDay" class="schedule-section">
        <h3 class="selected-day">{{ formatDate(selectedDay) }}</h3>
        <h4>Horários disponíveis</h4>
        <div class="slots">
          <button
            v-for="(slot, index) in availableSlots"
            :key="index"
            class="slot-btn"
            :disabled="slot.ocupado"
            @click="selectSlot(slot)"
          >
            {{ slot.hora }}
            <span v-if="slot.ocupado">(Ocupado)</span>
          </button>
        </div>

        <!-- Formulário de agendamento, se um horário for selecionado -->
        <div v-if="selectedSlot && !slotConfirmed" class="agendamento-form">
          <h4>Agendar para {{ selectedSlot.hora }}</h4>
          <form @submit.prevent="confirmarAgendamento">
            <div class="form-group">
              <label for="tipoLavagem">Tipo de Lavagem:</label>
              <select v-model="tipoLavagem" id="tipoLavagem" required>
                <option value="">Selecione</option>
                <option value="Simples">Simples</option>
                <option value="Completa">Completa</option>
                <option value="Polimento">Polimento</option>
              </select>
            </div>
            <div class="form-group">
              <label for="placa">Placa do Veículo:</label>
              <input
                type="text"
                id="placa"
                v-model="placa"
                placeholder="ABC-1234"
                required
              />
            </div>
            <button type="submit" class="btn-confirmar">Agendar</button>
          </form>
        </div>

        <!-- Mensagem de sucesso -->
        <div v-else-if="slotConfirmed">
          <p class="success-msg">Agendamento realizado com sucesso!</p>
        </div>
      </div>
    </div>

    <!-- Botão de voltar no final, centralizado -->
    <button class="btn-voltar" @click="goBack">Voltar ao Dashboard</button>
  </div>
</template>

<script>
// import axios from "axios"; // Descomente se utilizar chamadas reais ao backend

export default {
  name: "UserAgendar",
  data() {
    return {
      loading: true,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      weekDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      weeks: [],
      selectedDay: null,
      availableSlots: [],
      selectedSlot: null,
      tipoLavagem: "",
      placa: "",
      slotConfirmed: false,
    };
  },
  computed: {
    monthName() {
      const nomesMes = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      return nomesMes[this.currentMonth];
    },
  },
  async created() {
    try {
      this.generateCalendar(this.currentYear, this.currentMonth);
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error("Erro ao carregar calendário:", error);
      alert("Erro ao carregar calendário.");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    goBack() {
      this.$router.replace("/dashboard");
    },
    generateCalendar(year, month) {
      this.weeks = [];
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startWeekDay = firstDayOfMonth.getDay();
      let currentDate = new Date(year, month, 1 - startWeekDay);

      while (currentDate <= lastDay || currentDate.getDay() !== 0) {
        const week = [];
        for (let i = 0; i < 7; i++) {
          const dayObj = { date: null, isCurrentMonth: false };
          if (
            currentDate.getMonth() === month &&
            currentDate.getFullYear() === year
          ) {
            dayObj.date = new Date(currentDate);
            dayObj.isCurrentMonth = true;
          }
          week.push(dayObj);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        this.weeks.push(week);
      }
    },
    dayClass(day) {
      let classes = [];
      if (day.date) {
        classes.push("calendar-day");
        if (
          this.selectedDay &&
          day.date.toDateString() === this.selectedDay.toDateString()
        ) {
          classes.push("selected");
        }
      } else {
        classes.push("empty-day");
      }
      if (!day.isCurrentMonth) {
        classes.push("other-month");
      }
      return classes.join(" ");
    },
    async selectCalendarDay(day) {
      if (!day.date || !day.isCurrentMonth) return;
      this.selectedDay = day.date;
      await this.fetchSlots(day.date);
      this.selectedSlot = null;
      this.slotConfirmed = false;
    },
    async fetchSlots(dateObj) {
      // Exemplo simulado: gera slots das 08:00 às 18:00
      // Ajuste se integrar com backend
      this.availableSlots = [];
      for (let hour = 8; hour <= 18; hour++) {
        const ocupado = Math.random() < 0.3;
        this.availableSlots.push({
          id: parseInt(`${dateObj.getDate()}${hour}`),
          hora: `${hour.toString().padStart(2, "0")}:00`,
          ocupado: ocupado,
        });
      }
    },
    selectSlot(slot) {
      if (!slot.ocupado) {
        this.selectedSlot = slot;
        this.tipoLavagem = "";
        this.placa = "";
        this.slotConfirmed = false;
      }
    },
    async confirmarAgendamento() {
      if (!this.selectedSlot) return;
      try {
        alert(`Agendado com sucesso:
Dia: ${this.formatDate(this.selectedDay)}
Hora: ${this.selectedSlot.hora}
Tipo: ${this.tipoLavagem}
Placa: ${this.placa}`);
        this.selectedSlot.ocupado = true;
        this.slotConfirmed = true;
      } catch (error) {
        console.error("Erro ao agendar:", error);
        alert("Erro ao agendar horário.");
      }
    },
    formatDate(dateObj) {
      return dateObj ? dateObj.toLocaleDateString() : "";
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.generateCalendar(this.currentYear, this.currentMonth);
      this.selectedDay = null;
      this.availableSlots = [];
      this.selectedSlot = null;
      this.slotConfirmed = false;
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.generateCalendar(this.currentYear, this.currentMonth);
      this.selectedDay = null;
      this.availableSlots = [];
      this.selectedSlot = null;
      this.slotConfirmed = false;
    },
  },
};
</script>

<style scoped>
/* Fundo inspirado na logo (azul-escuro), texto claro */
.agendar {
  background-color: #0a1b2e;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff; /* texto branco */
  padding: 2rem;
  text-align: center;
}

/* Container para a logo */
.logo-container {
  margin-bottom: 1rem;
}

/* Ajuste de tamanho da logo */
.logo {
  height: 80px;
  width: auto;
}

/* Título principal em amarelo/laranja */
h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #f8c253;
}

.loading-state p {
  font-size: 1.2rem;
  margin-top: 2rem;
}

/* Cabeçalho do calendário */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

/* Botões de trocar mês */
.btn-mes {
  padding: 0.5rem 1rem;
  background-color: #142b44;
  border: 1px solid #f8c253;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  color: #f8c253;
}
.btn-mes:hover {
  background-color: #1d3a5f;
}

/* Wrapper do calendário */
.calendar-wrapper {
  overflow-x: auto;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto 1rem auto;
}

/* Tabela do calendário */
.calendar-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  border-radius: 8px;
  text-align: center;
}

.calendar-table th,
.calendar-table td {
  width: 14.28%;
  height: 70px;
  border: 1px solid #ddd;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #000; /* texto preto no calendário */
  background-color: #fafafa;
}

.calendar-table th {
  background-color: #f2f2f2;
  font-weight: 600;
}

.calendar-day:hover {
  background-color: #f9f9f9;
}

.selected {
  background-color: #cde4ff !important;
  font-weight: 600;
  border: 1px solid #90caf9;
}

.other-month {
  color: #bbb;
}

.empty-day {
  background-color: #fdfdfd;
}

.schedule-section {
  margin-top: 1rem;
}

.selected-day {
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.2rem;
  color: #f8c253;
}

.slots {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
}

/* Botões de horário */
.slot-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #f8c253;
  background-color: #142b44;
  color: #f8c253;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: transform 0.2s, background-color 0.2s;
}
.slot-btn:hover {
  transform: scale(1.05);
  background-color: #1d3a5f;
}
.slot-btn:disabled {
  background-color: #ccc;
  color: #777;
  cursor: not-allowed;
}

/* Formulário de agendamento */
.agendamento-form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.agendamento-form form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-group label {
  font-weight: 600;
  color: #f8c253;
}

form select,
form input {
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  color: #000; /* texto preto */
}

/* Botão de confirmar agendamento */
.btn-confirmar {
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  align-self: center;
  font-weight: 600;
}
.btn-confirmar:hover {
  background-color: #218838;
}

/* Mensagem de sucesso */
.success-msg {
  color: #28a745;
  font-weight: 600;
  margin-top: 1rem;
}

/* Botão de voltar */
.btn-voltar {
  margin-top: 2rem;
  padding: 0.6rem 1.2rem;
  background-color: #142b44;
  border: 1px solid #f8c253;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  color: #f8c253;
}
.btn-voltar:hover {
  background-color: #1d3a5f;
}
</style>
