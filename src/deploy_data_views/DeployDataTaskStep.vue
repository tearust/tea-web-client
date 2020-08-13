<template>

<el-steps :active="step" style="margin: 10px 0 30px;">
  <el-step title="Select" description=""></el-step>
  <el-step title="Upload Data" description=""></el-step>
</el-steps>

</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    step: {
      type: Number,
      required: true
    }
  }
}
</script>