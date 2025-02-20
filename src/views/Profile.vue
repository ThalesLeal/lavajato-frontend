<template>
  <div class="profile">
    <h2>Perfil do Usuário</h2>
    <p><strong>Nome:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Veículo:</strong> {{ user.vehicle }}</p>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      user: {
        name: "Fulano de Tal",
        email: "fulano@example.com",
        vehicle: "Honda Civic",
      },
    };
  },
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
