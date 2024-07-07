// --------UTILS--------//
import service from "./axiosConfig";

const ApiService = {
  // Auth
  register(data) {
    return service.post("/auth/register/", data);
  },
  login(data) {
    return service.post("/auth/login/", data);
  },
  getUser() {
    return service.get("/auth/me/");
  },
  putUser(data) {
    return service.put("/auth/me/", data);
  },
  patchUser(data) {
    return service.patch("/auth/me/", data);
  },
  deleteUser() {
    return service.delete("/auth/me/");
  },
  refreshToken(data) {
    return service.post("/auth/token/refresh/", data);
  },

  // Password Reset
  resetPassword(data) {
    return service.post("/password/reset/", data);
  },
  confirmResetPassword(data) {
    return service.post("/password/reset/confirm/", data);
  },

  // Categories
  getCategories() {
    return service.get("/categories/");
  },
  postCategory(data) {
    return service.post("/categories/", data);
  },
  getCategoryBySlug(slug) {
    return service.get(`/categories/${slug}/`);
  },
  putCategory(slug, data) {
    return service.put(`/categories/${slug}/`, data);
  },
  patchCategory(slug, data) {
    return service.patch(`/categories/${slug}/`, data);
  },
  deleteCategory(slug) {
    return service.delete(`/categories/${slug}/`);
  },

  // Posts
  getPosts() {
    return service.get("/post/");
  },
  postPost(data) {
    return service.post("/post/", data);
  },
  getPostBySlug(slug) {
    return service.get(`/post/${slug}/`);
  },
  getPostByCategory(category) {
    return service.get(`/post/?category__title=${category}`);
  },
  putPost(slug, data) {
    return service.put(`/post/${slug}/`, data);
  },
  patchPost(slug, data) {
    return service.patch(`/post/${slug}/`, data);
  },
  deletePost(slug) {
    return service.delete(`/post/${slug}/`);
  },

  // Comments
  getComments() {
    return service.get("/comments/");
  },
  postComment(data) {
    return service.post("/comments/", data);
  },
  getCommentById(id) {
    return service.get(`/comments/${id}/`);
  },
  getCommentsByPost(post) {
    return service.get(`/comments/?post__slug=${post}`);
  },
  putComment(id, data) {
    return service.put(`/comments/${id}/`, data);
  },
  patchComment(id, data) {
    return service.patch(`/comments/${id}/`, data);
  },
  deleteComment(id) {
    return service.delete(`/comments/${id}/`);
  },
};

export default ApiService;
