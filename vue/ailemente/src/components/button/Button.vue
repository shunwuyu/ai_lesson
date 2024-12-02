<template>
  <button
    class="el-button" 
    :class="[
      buttonSize ? `el-button--${buttonSize}` : '',
      type ? `el-button--${type}` : ''
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default{
  name:'ElButton'
}
</script>

<script setup lang="ts">

import {computed, withDefaults} from 'vue'
import { useGlobalConfig } from '../../util';

interface Props {
  size?:""|'small'|'medium'|'large',
  type?:""|'primary'|'success'|'danger'
}
const props = withDefaults(defineProps<Props>(),{
  size:"",
  type:""
})
const globalConfig = useGlobalConfig()
const buttonSize = computed(()=>{
  console.log(props.size,globalConfig)
  return props.size||globalConfig.size
})
</script>

<style lang="scss">
@import '../styles/mixin';

@include b(button){
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: $--button-default-background-color;
  color: $--button-default-font-color;
  -webkit-appearance: none;
  text-align: center;
  border: $--border-base;
  border-color: $--button-default-border-color;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  font-weight: $--button-font-weight;
  & + & {
    margin-left: 10px;
  }
  @include button-size(
    $--button-padding-vertical,
    $--button-padding-horizontal,
    $--button-font-size,
    $--button-border-radius
  );
  &:hover,
  &:focus {
    color: $--color-primary;
    border-color: mix($--color-white,$--color-primary,70%);
    background-color: mix($--color-white,$--color-primary,90%);
  }
  @include m(medium) {
    @include button-size(
      $--button-medium-padding-vertical,
      $--button-medium-padding-horizontal,
      $--button-medium-font-size,
      $--button-medium-border-radius
    );
  }
  @include m(small) {
    @include button-size(
      $--button-small-padding-vertical,
      $--button-small-padding-horizontal,
      $--button-small-font-size,
      $--button-small-border-radius
    );

  }
  @include m(large) {
    @include button-size(
      $--button-large-padding-vertical,
      $--button-large-padding-horizontal,
      $--button-large-font-size,
      $--button-large-border-radius
    );
  }
@include m(primary) {
    @include button-variant(
      $--button-primary-font-color,
      $--button-primary-background-color,
      $--button-primary-border-color
    );
  }
  @include m(success) {
    @include button-variant(
      $--button-success-font-color,
      $--button-success-background-color,
      $--button-success-border-color
    );
  }
  @include m(danger) {
    @include button-variant(
      $--button-danger-font-color,
      $--button-danger-background-color,
      $--button-danger-border-color
    );
  }

}
</style>