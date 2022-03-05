var app = new Vue({
  el: '#app',
  data: {
    todos: [{
      text: "make an app",
      completed: false,
    }, 
    {
      text: "declare victory",
      completed: false,
    }, {
      text: "profit",
      completed: false
    }],
    activeTodos: [{
      
    }],
    message: '',
    show: 'all',
    drag: {},
  },
  methods: {
    addItem() {
      this.todos.push({text: this.message, completed:false});
      this.message = '';
    },
    deleteItem(item) {
      var i = this.todos.indexOf(item);
      if(i > -1) {
        this.todos.splice(i, 1);
      }
    },
    activeTodos() {
      return this.todos.filter((item) => {
        return !item.completed;
      })
    },
    dragItem(item) {
      this.drag = item;
    },
    dropItem(item) {
      const indexItem = this.todos.indexOf(this.drag);
      const indexTarget = this.todos.indexOf(item);
      this.todos.splice(indexItem,1);
      this.todos.splice(indexTarget,0,this.drag);
    },
  }
});