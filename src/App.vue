<template>
    <navbar-vue></navbar-vue>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import NavbarVue from '@/components/UI/NavbarVue'
    export default {
        components:{
          NavbarVue  
        }
    }
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}
</style>