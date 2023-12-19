const ENDPOINTS = {
  Registration: "registration",
  Login: "login",
  Logout: "logout",
  Profile: "profile",
  Groups: {
    list: "groups/list",
    create: "groups/create",
    delete: "groups/delete",
    read: "groups/read",
    message: "groups/append"
  },
  Users: "users",
  Conversations: {
    list: "conversations/list",
    create: "conversations/create",
    read: "conversations/read",
    message: "conversations/append",
    delete: "conversations/delete",
  },
};

export default ENDPOINTS;
