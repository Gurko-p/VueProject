<template>
    <div v-if="posts.length > 0">
        <h4>Список пользователей: </h4>
        <transition-group name="post-list">
            <post-item v-for='post in posts' :post='post' :key='post.id' @remove="$emit('remove', post)" class="list-item"/>
        </transition-group>
    </div>
    <h2 v-else class="posts-empty">
        Список пользователей пуст!
    </h2>
</template>

<script>
import PostItem from '@/components/PostItem'
export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.posts-empty {
    color: red;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(150px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>