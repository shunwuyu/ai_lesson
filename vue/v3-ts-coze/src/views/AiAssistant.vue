<template>

    <div class="backgrond">
        <router-link to="/dialogue">
            <div class="container">
                <div class="btn">
                    <p>开启AI智能选车</p>
                </div>
            </div>
        </router-link>
    </div>




</template>

<script setup>

</script>

<style lang="less" scoped>
.backgrond {
    width: 100%;
    height: 100vh;
    background: linear-gradient(45deg,
            #3498db,
            #2ecc71);
    /* Gradient background */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Shadow for depth */
    border-radius: 10px;
    /* Rounded corners */
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(90deg,
                rgba(255, 255, 255, 0.1) 1px,
                transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        background-size: 20px 20px;
        pointer-events: none;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 6rem;

        .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            text-align: center;
            width: 80%;
            height: 10vh;
            cursor: pointer;
            color: #fff;
            font-size: 1rem;
            line-height: 1.5rem;
            border-radius: 1rem;
            border: none;
            position: relative;
            background: #100720;
            transition: 0.1s;

            &::after {
                content: '';
                width: 100%;
                height: 100%;
                background-image: radial-gradient(circle farthest-corner at 10% 20%, rgba(255, 94, 247, 1) 17.8%, rgba(2, 245, 255, 1) 100.2%);
                filter: blur(15px);
                z-index: -1;
                position: absolute;
                left: 0;
                top: 0;
            }

            &:active {
                transform: scale(0.9) rotate(3deg);
                background: radial-gradient(circle farthest-corner at 10% 20%, rgba(255, 94, 247, 1) 17.8%, rgba(2, 245, 255, 1) 100.2%);
                transition: 0.5s;
            }
        }
    }

}
</style>