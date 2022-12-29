import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Session } from "@/models/session.model";
import { User } from "@/models/user.model";
import api from "@/services/api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const session = reactive<Session>({ isLoggedIn: false });
  const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);

  async function login(user: User) {
    try {
      fetchingStatus.value = FetchingStatus.fetching;
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let result = await api.login(user);
      if (result == true) {
        session.username = user.username;
        session.isLoggedIn = true;
        fetchingStatus.value = FetchingStatus.success;
      } else {
        session.isLoggedIn = false;
        fetchingStatus.value = FetchingStatus.failed;
      }
    } catch (e) {
      session.isLoggedIn = false;
      fetchingStatus.value = FetchingStatus.failed;
    }
  }

  async function register(user: User) {
    try {
      fetchingStatus.value = FetchingStatus.fetching;
      let result = await api.register(user);
      if (result == true) {
        fetchingStatus.value = FetchingStatus.success;
      } else {
        fetchingStatus.value = FetchingStatus.failed;
      }
    } catch (e) {
      fetchingStatus.value = FetchingStatus.failed;
    }
  }

  return { session, fetchingStatus, login, register };
});
