<template>
  <div id="app">
    <!-- A área principal onde cada rota é carregada -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Espaço para a barra inferior não sobrepor o conteúdo */
#app {
  padding-bottom: 60px; /* altura da bottom-nav */
}

/* Barra fixa no rodapé */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* Itens da barra */
.nav-item {
  color: #333;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-item i {
  font-size: 20px;
  margin-bottom: 4px;
}
</style>
