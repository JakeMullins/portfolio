

let app = new Vue({
    // bind it to the #root div in the DOM
    el: "#root",
    // provide data for bindings
    data: {
      message: "Hello World",
      names: ['Emma', 'Brandon', 'Lucy', 'Jorge'],  
      newName: '',
      title: "Learn JS",
      tasks: [{
        description: "Create some loaves of bread",
        completed: true
      },
      {
        description: "Create some fish",
        completed: true
      },
      {
        description: "Create more loaves of bread",
        completed: false,
      },
      {
        description: "Create more fish",
        completed: false
      },
      {
        description: "Create more loaves of bread",
        completed: false
      },
      {
        description: "Tell Peter to clean up the mess",
        completed: false
      }
    ]
    },
    computed: {
      screaming() {
        return this.message.toUpperCase();
      },
      uncompletedTasks() {
        return this.tasks.filter( (task) => {
            return !task.completed;
          })
      }
    },
    // custom methods
    methods: {
      // addName will add the value of the newName property to the list of names
      addName() {
        if (this.newName === '')
          return;
        this.names.push(this.newName);
        this.newName = "";
      },

      logNames() {
        app.names.forEach((name) => {
          console.log(name);
        })
      }
    }
  });