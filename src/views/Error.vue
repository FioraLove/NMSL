<template>
    <div class="error">
        
        <div class="lemon">
            <p class="not-found">404</p>
        </div>
        <div class="p-right">
            <p>Not Found</p>
        </div>
    </div>
    
</template>

<style scoped>
    .error{
        height: 100vh;
        width: 100%;
        background-color: #000;
        overflow: hidden;
        position:relative;

    }
    .lemon{
        width: 10em;
        height: 8em;
        background-color: #F90;
        position:absolute;
        top:42%;
        left:45%;  
        border-radius: 12px;
        float: left;
    }
    .lemon p{
        margin-top: 30px;
        color: #000;
        font-size: 4em;
        text-align: center;
    }
    .p-right{
        width: 10em;
        height: 8em;
        /* background-color: #F90; */
        position:absolute;
        top:36%;
        left:58%;      
        border-radius: 12px;
        float: left;
    }
    .p-right p{
        margin-top: 30px;
        color: #FFF;
        font-size: 4em;
        font-family: 'Courier New', Courier, monospace;
    }
</style>