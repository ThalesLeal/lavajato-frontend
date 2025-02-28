<template>
  <div class="dashboard">
    <!-- Logo no topo -->
    <div class="logo-container">
      <img src="@/assets/logomarca.png" alt="Royal Carwash Logo" class="logo" />
    </div>
    <h2>Bem-vindo!</h2>
    <div class="options">
      <div class="option" @click="goToProfile">
        <i class="fas fa-user"></i>
        <p>Perfil</p>
      </div>
      <div class="option" @click="goToScheduling">
        <i class="fas fa-calendar-alt"></i>
        <p>Agendamentos</p>
      </div>
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
      this.$router.push("/profile");
    },
    goToScheduling() {
      this.$router.push("/scheduling");
    },
    goToAgendar() {
      this.$router.push("/agendar");
    },
  },
};
</script>

<style scoped>
.dashboard {
  background-color: #0a1b2e;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  padding: 2rem;
  text-align: center;
}
.logo-container {
  margin-bottom: 1.5rem;
}
.logo {
  height: 80px;
  width: auto;
}
h2 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #f8c253;
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
  background: #142b44;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 110px;
  transition: transform 0.2s, background-color 0.2s;
  border: 1px solid #f8c253;
}
.option:hover {
  transform: scale(1.05);
  background-color: #1d3a5f;
}
.option i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #f8c253;
}
.option p {
  color: #fff;
  font-weight: 600;
}
</style>
