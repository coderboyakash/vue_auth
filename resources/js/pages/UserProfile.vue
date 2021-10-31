<template>
    <h1>Profile Page Loded</h1>
    <button @click="handleLogout">Logout</button>
</template>
<script>
export default {
    setup() {
        // console.log('profile page');
    },
    emits: ["handleLogout"],
    methods:{
        handleLogout(){
            this.$emit('handleLogout')
        }
    }
}
</script>