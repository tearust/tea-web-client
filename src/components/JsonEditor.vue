<template>
<div :id="uuid">
</div>
</template>
<script>
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import utils from '../tea/utils';

export default {
  props: {
    json: {
      type: Object,
      required: true,
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  data(){
    return {
      uuid: utils.uuid(),
    }
  },
  created(){
    this.editor = null;
  },
  mounted(){
    const el = document.getElementById(this.uuid);
    this.editor = new JSONEditor(el, {
      mode: 'code',
      onChangeJSON: (val)=>{
        this.onChange(val)
      }
    }, this.json);
  }
}
</script>