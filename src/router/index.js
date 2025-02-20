import Vue from "vue";
import Router from "vue-router";

// Rotas de autenticação e usuário
import UserLogin from "@/views/Login.vue";
import UserRegister from "@/views/Register.vue";
import UserDashboard from "@/views/UserDashboard.vue";
import UserProfile from "@/views/Profile.vue";
import UserScheduling from "@/views/Scheduling.vue";

// Rotas de administração (separadas)
import AdminPanel from "@/views/components/AdminPanel.vue";
import Agendamento from "@/views/components/Agendamento.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    // Rota raiz redireciona para o login
    { path: "/", redirect: "/login" },
    // Rotas do usuário
    {
      path: "/login",
      name: "UserLogin",
      component: UserLogin,
    },
    {
      path: "/register",
      name: "UserRegister",
      component: UserRegister,
    },
    {
      path: "/dashboard",
      name: "UserDashboard",
      component: UserDashboard,
    },
    {
      path: "/profile",
      name: "UserProfile",
      component: UserProfile,
    },
    {
      path: "/scheduling",
      name: "UserScheduling",
      component: UserScheduling,
    },
    // Rotas de administração
    {
      path: "/admin",
      name: "AdminPanel",
      component: AdminPanel,
    },
    {
      path: "/agendamento",
      name: "Agendamento",
      component: Agendamento,
    },
  ],
});
