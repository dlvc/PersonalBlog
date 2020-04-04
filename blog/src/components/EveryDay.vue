<template>
  <div class="every-day shadow p-3 bg-white rounded">
    <h5 class="h-title">每日一句<small></small></h5>
    <p v-html="content">
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      content: ''
    }
  },
  computed: {
    
  },
  created() {
    axios.get('/api/queryEveryDay').then(resp => {
      this.content = resp.data.data[0].content || '';
    });
  }
}
</script>