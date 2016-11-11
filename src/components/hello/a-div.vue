<template>
    <div class="a-div">
        <span>{{msg}}</span>
    </div>
</template>
<style>
    .a-div{
        width: 200px;
        height: 100px;
        background-color: red;
        padding: 30px 0;
        text-align: center;
    }
</style>
<script>
    export default{
        data() {
            return {
                msg: 'hello vue',
            };
        },
    };
</script>
