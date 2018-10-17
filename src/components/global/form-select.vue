<template>
 <div>
   <el-select v-model="option.value" :clearabl="option.isClearabl" placeholder="请选择">
    <el-option
      v-for="item in option.array"
      :key="item.value"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
 </div>
</template>

<script>
 export default {
   data () {
     return {
        
     }
   },
   props: {
      option :{
        default() {
            return {
               value: '',
               array: [],
               isClearabl: false,
            }
        }
      }
   },
   components: {

   }
 }
</script>

<style scoped>
.el-select {
  width: 130px;
}
 
</style>
