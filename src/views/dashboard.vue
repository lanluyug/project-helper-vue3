<template>
    <div class="choise">
      <el-select 
      v-model="choiseValue" placeholder="请选择运行的模式" 
      clearable
      @change="optionChange"
      style="width: 240px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button type="primary" round @click="run" style="margin-left: 40px;">运行</el-button>
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
    <div class="notice">{{ optionDesc }}</div>
    <div class="console">
      <el-button plain class="copy-button"
                 @click="handleCopy"
                 v-copy="result">复制</el-button>
      {{ result }}
    </div>
  </template>
<script setup lang="ts" name="dashboard">
  import { onMounted, ref } from "vue";
  import { Codemirror } from "vue-codemirror";
  import { javascript } from "@codemirror/lang-javascript";
  import { java } from "@codemirror/lang-java";
  import { oneDark } from "@codemirror/theme-one-dark";
  import axios from 'axios';
  import {copyText} from 'vue3-clipboard'
  import {ElMessage} from 'element-plus'
  const code = ref(``);
  const options = ref([]);
  const result = ref(``)
  const optionDesc = ref(``)
  const choiseValue = ref(``);
  const extensions = [java(), oneDark];
  const handleClick = (type: string) => {
    console.log(type);
  };
  const optionChange = val => {
    console.log(val)
    optionDesc.value = options.value.filter(o => o.value === val)[0].desc
    console.log( options.value)
  }
  onMounted(() => {
    axios.get('/api/web/listMode')
      .then(response => {
        options.value = response.data.data
      })
      .catch(error => {
        console.error(error);
      });
  });
  const handleCopy = () => {
    if (result.value === '') {
      ElMessage.warning('请输入文本再复制');
      return
    }
    copyText(result.value, undefined, (error) => {
      if (error) {
        ElMessage.error(`复制失败: ${error} ！`);
      } else {
        ElMessage.success(`复制成功！`);
      }
    });
  }
  const shadow= {
    name: 'Dark Shadow',
    type: 'dark',
  }
  const run = () =>{
    if(choiseValue.value === ''){
      ElMessage.warning(`请选择运行模式！`);
      return
    }
    if(code.value === ''){
      ElMessage.warning(`请输入需要处理的内容！`);
      return
    }
    let param = {id: choiseValue.value, text: code.value};
    axios.post('/api/web/run', param)
      .then(response => {
        result.value = response.data.data.result
        console.log(response.data)
        copyText(result.value);
      })
      .catch(error => {
        console.error(error);
      });
    
  }
</script>
  <style>
  .box {
    width: 100%;
    height: 300px;
    border: 1px solid rgb(20, 20, 20);
  }
  .console {
    margin-top: 10px;
    width: calc(100% - 20px);
    height: 300px;
    padding-top: 20px;
    padding-left: 20px;
    background-color:#FFFFFF;
  }
  .notice {
    margin-top: 10px;
    width: 100%;
    min-height: 50px;
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
    background-color:silver;
    padding-top: 10px;
  }
  .choise {
    width: 100%;
    height: 50px;
  }
  .code {
    width: 300px;
    height: 300px;
  }
  .copy-button {
      float: right;
      margin-right: 10px;
  }
  </style>
  