<template>
  <div class="dashboard">
    <!-- Logo no topo -->
    <div class="logo-container">
      <!-- Ajuste o caminho caso seu arquivo tenha outro nome ou esteja em outra pasta -->
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
      if (this.$route.path !== "/profile") {
        this.$router.push("/profile");
      }
    },
    goToScheduling() {
      if (this.$route.path !== "/scheduling") {
        this.$router.push("/scheduling");
      }
    },
    goToAgendar() {
      if (this.$route.path !== "/agendar") {
        this.$router.push("/agendar");
      }
    },
  },
};
</script>

<style scoped>
/* Fundo azul-escuro para combinar com a logo */
.dashboard {
  background-color: #0a1b2e; /* Ajuste conforme desejar */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff; /* Texto branco */
  padding: 2rem;
  text-align: center;
}

/* Container da logo */
.logo-container {
  margin-bottom: 1.5rem;
}

/* Ajuste a altura/largura conforme desejar */
.logo {
  height: 100px;
  width: auto;
}

/* Título principal */
h2 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #f8c253; /* Tom amarelado/laranja para combinar com a logo */
}

/* Container das opções */
.options {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

/* Cada opção (card) */
.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #142b44; /* Azul um pouco mais claro que o fundo */
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 110px;
  transition: transform 0.2s, background-color 0.2s;
  border: 1px solid #f8c253; /* Borda amarela */
}

/* Efeito de hover */
.option:hover {
  transform: scale(1.05);
  background-color: #1d3a5f;
}

/* Ícones das opções */
.option i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #f8c253; /* Ícone amarelado */
}

/* Texto das opções */
.option p {
  color: #fff;
  font-weight: 600;
}
</style>
