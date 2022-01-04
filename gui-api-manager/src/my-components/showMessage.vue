<template>
    <v-alert
  :type="this.type"
>{{this.message}}</v-alert>
</template>


<script>
    export default {
        name:"showMessage",
        props:["message","type"]
    }
</script>
