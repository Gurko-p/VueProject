<template>
    <div>
        <h1>Страница с постами:</h1>
        <my-input v-model="searchQuery" v-focus />
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"></my-select>
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list :posts="selectedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" />
        <div v-else>
            <h3>Идет загрузка постов...</h3>
        </div>
        <div ref="observer" class="observer"></div>
        <!--         <div class="page__wrapper">
            <div v-for="pageNumber in totalPages" :key="pageNumber" class="pageItem" @click="changePage(pageNumber)"
                :class="{ active: page === pageNumber }">{{ pageNumber }}</div>
        </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";

export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            isCurrentPage: true,
            totalPages: 0,
            page: 1,
            limit: 10,
            sortOptions: [
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По описанию' }
            ]
        };
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        /*         changePage(pageNumber){
                    this.page = pageNumber;
                }, */
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                }
                );
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = response.data;
            } catch (e) {
                alert("Ошибка");
            } finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1;
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                }
                );

                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...response.data];
            } catch (e) {
                alert("Ошибка");
            } 
        },
    },
    mounted() {
        this.fetchPosts();
        console.log(this.$refs.observer);
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries) => {
            if (entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts();
            }

        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
    },
    computed: {
        selectedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        selectedAndSearchedPosts() {
            return this.selectedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        /*         page(){
                    this.fetchPosts();
                } */
    },
};
</script>

<style>

.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.pageItem {
    border: 1px solid black;
    padding: 15px;
}

.active {
    border: 2px solid teal;
}

.observer {
    height: 10px;
    background: green;
}
</style>
