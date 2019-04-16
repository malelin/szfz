/*
 * @Author: 旺苍扛把子
 * @LastEditors: 旺苍扛把子
 * @Description: 能让vue异步计算的计算属性插件
 * @Date: 2019-04-16 16:27:48
 * @LastEditTime: 2019-04-16 17:43:33
 */
import Vue from "vue";
import AsyncComputed from "vue-async-computed";
Vue.use(AsyncComputed);
//example
/* new Vue({
  asyncComputed: {
    async someCalculation() {
      const x = await someAsycFunction();
      const y = await anotherAsyncFunction();
      return x + y;
    }
  }
}); */
/*  blogPostContent: {
        The `get` function is the same as the function you would
        pass directly as the value to `blogPostContent` if you
        didn't need to specify a default value.
       get () {
         return Vue.http.get('/post/' + this.postId)
           .then(response => response.data.postContent)
        },
         The computed proporty `blogPostContent` will have
         the value 'Loading...' until the first time the promise
         returned from the `get` function resolves.
        default: 'Loading...',
        watch: ['timesPostHasBeenUpdated'],
        // Will update whenever the pageType or postId changes
        // but only if the pageType is not 'index' this way the
        // blogPostContent will be refetched when loading the
        // 'details' and 'edit' pages
      shouldUpdate () {
        return this.pageType !== 'index'
      }
     } */
