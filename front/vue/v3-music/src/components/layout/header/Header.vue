<template>
    <div class="flex items-center justify-between drag h-14">
        <div class="flex items-center pl-5">
            <IconPark :icon="Left" :size="iconSize" :stroke-width="2" class="icon-button" />
            <IconPark :icon="Right" :size="iconSize" :stroke-width="2" class="icon-button"/>
            <div class="search no-drag ml-2">
                <SearchPop/>
            </div>
        </div>
        <div class="flex items-center mr-5">
            <IconPark :icon="Mail" :stroke-width="2" class="icon-button"/>
            <IconPark :icon="Platte" :stroke-width="2" class="icon-button"/>
            <IconPark :icon="HamburgerButton" :stroke-width="2" class="icon-button"/>
        </div>
    </div>
</template>
<script setup>
import SearchPop from "@/components/layout/header/SearchPop.vue";
import {HamburgerButton, Left, Mail, Platte, Right, Search} from '@icon-park/vue-next'
const iconSize = 22;
</script>
<style>
</style>