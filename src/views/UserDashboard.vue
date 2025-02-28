<template>
  <div class="dashboard">
    <h2>Bem-vindo!</h2>
    <div class="options">
      <!-- Botão de Perfil -->
      <div class="option" @click="goToProfile">
        <i class="fas fa-user"></i>
        <p>Perfil</p>
      </div>
      <!-- Botão de Agendamentos (lista) -->
      <div class="option" @click="goToScheduling">
        <i class="fas fa-calendar-alt"></i>
        <p>Agendamentos</p>
      </div>
      <!-- Botão de Agendar (calendário) -->
      <div class="option" @click="goToAgendar">
        <i class="fas fa-calendar-plus"></i>
        <p>Agendar</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDashboard",
  methods: {
    goToProfile() {
      if (this.$route.path !== "/profile") {
        this.$router.push("/profile").catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            throw err;
          }
        });
      }
    },
    goToScheduling() {
      if (this.$route.path !== "/scheduling") {
        this.$router.push("/scheduling").catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            throw err;
          }
        });
      }
    },
    goToAgendar() {
      if (this.$route.path !== "/agendar") {
        this.$router.push("/agendar").catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            throw err;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 1rem;
}

.options {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100px;
  transition: transform 0.2s;
}

.option:hover {
  transform: scale(1.05);
}

.option i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
</style>
