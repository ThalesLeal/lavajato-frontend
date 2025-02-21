<template>
  <div class="scheduling">
    <h2>Agendamentos</h2>
    <p>Aqui você pode visualizar ou agendar seus serviços.</p>
    <button class="btn-voltar" @click="voltarDashboard">Voltar</button>
  </div>
</template>

<script>
export default {
  name: "UserScheduling",
  methods: {
    voltarDashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.scheduling {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}
.btn-voltar {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
