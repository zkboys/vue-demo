export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'I\'m Bar! I have index.js style.less template.html',
      count: 0,
      formData: {
        name: '小王',
        pass: 1111,
      },
    };
  },
  ready() {
    this.handel = setInterval(() => {
      this.count++;
    }, 1000);
  },
  destroyed() {
    clearInterval(this.handel);
  },
};
