<template>
    <div class="db-buttons">
        <el-button type="primary" round @click="run">运行</el-button>
    </div>
    <div class="box">
      <Codemirror
        class="code"
        v-model="code"
        :style="{ height: '100%' }"
        :extensions="extensions"
        :autofocus="true"
        :disabled="false"
        @ready="handleClick('ready')"
        @change="handleClick('change')"
        @focus="handleClick('focus')"
        @blur="handleClick('blur')"
      />
    </div>
  </template>
<script setup lang="ts" name="dashboard">
  import { ref } from "vue";
  import { Codemirror } from "vue-codemirror";
  import { javascript } from "@codemirror/lang-javascript";
  import { java } from "@codemirror/lang-java";
  import { oneDark } from "@codemirror/theme-one-dark";
  const code = ref(`console.log('Hello, world!');console.log('Hello, world!');`);
  const extensions = [java(), oneDark];
  const handleClick = (type: string) => {
    console.log(type);
  };
  const run = () =>{
    console.log(code);
  }
  </script>
  <style>
  .db-buttons {
    margin: 20px;
    float: right;
  }
  .box {
    width: 100%;
    height: 300px;
    border: 1px solid #f00;
  }
  .code {
    width: 300px;
    height: 300px;
  }
  </style>
  