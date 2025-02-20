<template>
  <div class="chat-whats-app">
    <button @click="abrirChat">Iniciar Chat via WhatsApp</button>
  </div>
</template>

<script>
export default {
  name: "ChatWhatsApp",
  methods: {
    abrirChat() {
      const numero = "5511999999999";
      const mensagem = "Olá, gostaria de conversar sobre o agendamento";
      const link = `https://wa.me/${numero}?text=${encodeURIComponent(
        mensagem
      )}`;
      window.open(link, "_blank");
    },
  },
};
</script>

<style scoped>
.chat-whats-app {
  margin-top: 2rem;
  text-align: center;
}
.chat-whats-app button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
