<template>
  <div class="home">
    <h1>home</h1>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import {useStore} from 'vuex'

export default {
  name: 'Home',
  setup(){
    const store = useStore()

    onMounted(()=>getIssuesList())

    const getIssuesList = ()=> {
				store.dispatch("getIssuesList").then(res => {
					console.log(res.data);
				});
			}
  }
}
</script>
