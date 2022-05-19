<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input v-model="post.title" type="text" placeholder="Название" />
        <my-input v-model="post.body" type="text" placeholder="Описание поста" />
        <my-button class="btn-create-post" @click="createPost" name="Создать">Создать</my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: ''
            }
        },
    },
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

.btn-create-post {
    align-self: flex-end;
    margin-top: 15px;
}
</style>