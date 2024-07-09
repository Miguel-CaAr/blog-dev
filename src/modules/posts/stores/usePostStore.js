// -----------UTILS-----------//
import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("usePostStore", () => {
  // ----------STATES----------//
  const post = ref(null);
  const comment = ref(null);
  const commentsByPost = ref([]);
  const postLoadingHttp = ref({
    loading: false,
    title: "",
    description: "",
  });

  // ----------FUNCTIONS----------//
  const fillPost = (data) => {
    post.value = data;
  };

  const fillCommentsByPost = (data) => {
    commentsByPost.value = data;
  };

  return {
    // States
    post,
    comment,
    commentsByPost,
    postLoadingHttp,
    // Functions
    fillPost,
    fillCommentsByPost,
  };
});
