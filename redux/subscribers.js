import store from "./store";
store.subscribe(() => {
  if (store.getState().user.user.login) {
    localStorage.setItem("user", JSON.stringify(store.getState().user.user));
  }
});
