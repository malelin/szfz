const directives = {
  /* input自动聚焦 */
  focus: {
    inserted: function(el) {
      el.focus();
    }
  },
  /**
   * @directive 图片未加载前显示随机背景
   */
  lazyimg: {
    inserted(el, binding) {
      let color = Math.floor(Math.random() * 1000000);
      el.style.backgroundColor = "#" + color;
      let img = new Image();
      img.src = binding.value;
      img.onload = function() {
        let factSrc = binding.value;
        el.style.backgroundImage = "url(" + factSrc + ")";
      };
    }
  },
  /*  点击外部区域 */
  clickoutside: {
    inserted(el, binding) {
      let documentHandler = e => {
        if (el.contains(e.target)) {
          return false;
        }
        if (binding.expression) {
          binding.value(e);
        }
      };
      el.__vueClickOutside__ = documentHandler;
      document.addEventListener("click", documentHandler);
    },
    unbind(el) {
      document.removeEventListener("click", el.__vueClickOutside__);
      delete el.__vueClickOutside__;
    }
  }
};
export default directives;
