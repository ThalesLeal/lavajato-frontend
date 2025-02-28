<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <div class="left-section">
        <h2>{{ monthName }} de {{ currentYear }}</h2>
      </div>
      <div class="right-section">
        <button @click="goToday">Hoje</button>
      </div>
    </div>
    <table class="calendar-table">
      <thead>
        <tr>
          <th>Dom</th>
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
            class="calendar-cell"
            @click="dayObj && selectDay(dayObj)"
          >
            <div v-if="dayObj" class="day-card">
              <span class="day-number" :class="{ today: isToday(dayObj) }">
                {{ dayObj.date.getDate() }}
              </span>
            </div>
            <div v-else class="empty-cell"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "UserCalendar",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      weeks: [],
    };
  },
  computed: {
    monthName() {
      const nomesMes = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ];
      return (
        nomesMes[this.currentMonth - 1].charAt(0).toUpperCase() +
        nomesMes[this.currentMonth - 1].slice(1)
      );
    },
  },
  created() {
    this.generateCalendar();
  },
  methods: {
    generateCalendar() {
      // Gera um calendário completo do mês atual (domingo a sábado)
      const firstDay = new Date(this.currentYear, this.currentMonth - 1, 1);
      const lastDayNum = new Date(
        this.currentYear,
        this.currentMonth,
        0
      ).getDate();
      const weeks = [];
      let currentDate = new Date(firstDay);
      let week = [];
      // Preenche até que cada semana tenha 7 dias
      while (
        currentDate <=
        new Date(this.currentYear, this.currentMonth - 1, lastDayNum)
      ) {
        week.push(new Date(currentDate));
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      // Se a última semana tiver menos que 7 dias, preenche com null
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
      this.weeks = weeks;
    },
    goToday() {
      const now = new Date();
      this.currentYear = now.getFullYear();
      this.currentMonth = now.getMonth() + 1;
      this.generateCalendar();
    },
    isToday(day) {
      if (!day) return false;
      const today = new Date();
      return (
        today.getFullYear() === day.getFullYear() &&
        today.getMonth() === day.getMonth() &&
        today.getDate() === day.getDate()
      );
    },
    selectDay(day) {
      this.$emit("daySelected", {
        date: day.toISOString().split("T")[0],
        // A lógica de horários será gerada no backend, mas aqui você pode definir um array vazio
        times: [],
      });
    },
  },
};
</script>

<style scoped>
.calendar-container {
  background-color: #1c1c1e;
  color: #fff;
  width: 900px;
  margin: 2rem auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c2c2e;
  padding: 1rem;
  border-bottom: 1px solid #444;
}
.calendar-header h2 {
  font-size: 1.4rem;
  font-weight: 500;
  margin: 0;
  text-transform: capitalize;
}
.right-section button {
  background-color: transparent;
  border: none;
  color: #fff;
  margin-left: 0.5rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}
.right-section button:hover {
  background-color: #3a3a3c;
}
.calendar-table {
  width: 100%;
  border-collapse: collapse;
}
.calendar-table thead {
  background-color: #2c2c2e;
}
.calendar-table th {
  color: #bbb;
  font-weight: normal;
  padding: 0.8rem 0;
  border-bottom: 1px solid #444;
  text-transform: lowercase;
}
.calendar-table td {
  border: 1px solid #2c2c2e;
  height: 120px;
  vertical-align: top;
  position: relative;
  text-align: left;
  padding: 0.5rem;
  cursor: pointer;
}
.day-card {
  width: 100%;
  height: 100%;
  position: relative;
}
.day-number {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 0.9rem;
  font-weight: 500;
}
.today {
  background-color: #007aff;
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
}
.empty-cell {
  background-color: #1c1c1e;
}
</style>
