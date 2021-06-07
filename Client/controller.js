class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view
      this.model.bindTodoListChanged(this.onTodoListChanged)
      this.view.bindAddTodo(this.handleAddTodo)
      this.view.bindEditTodo(this.handleEditTodo)
      this.view.bindDeleteTodo(this.handleDeleteTodo)
      this.view.bindToggleTodo(this.handleToggleTodo)
      this.view.bindFilterTodo(this.handleFilterTodo);
      this.view.bindUploadTodo(this.handleUpload);
      this.view.bindDownloadTodo(this.handleDownload);
      this.onTodoListChanged(this.model.todos)
      //this.hideBtnn(this.view.hideBtn)
      //this.showNamee(this.view.showName)
    }
  
    onTodoListChanged = todos => {
      this.view.displayTodos(todos)
    }
  
    handleAddTodo = todoText => {
      this.model.addTodo(todoText)
    }
  
    handleEditTodo = (id, todoText) => {
      this.model.editTodo(id, todoText)
    }
  
    handleDeleteTodo = id => {
      this.model.deleteTodo(id)
    }
  
    handleToggleTodo = id => {
      this.model.toggleTodo(id)
    }
    handleFilterTodo = filter => {
      this.model.filterTodo(filter);
  };

  handleUpload = () => {
    if (!this.model.todos)
      return;
    var data =JSON.stringify(localStorage.getItem('TODOS'));
    var JWT = localStorage['information'];
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var resTemp = this.responseText;
        if (!resTemp) return;
        alert("upload successfuly!");
      }
    }

    xmlHttp.open('POST', 'upload', true);
    xmlHttp.setRequestHeader('authorization', JWT);
    xmlHttp.send(data);
  }

  handleDownload = () => {
    var xmlHttp = new XMLHttpRequest();
    var self = this;
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        self.model.setLocalStorage(JSON.parse(this.responseText));
        alert("replace Successfully!");
      }
      else if (xmlHttp.readyState === 4 && (xmlHttp.status === 500 || xmlHttp.status === 401)) {
        alert(xmlHttp.responseText);
      }
    };
    const JWT = localStorage["information"];
    xmlHttp.open('GET', 'download', true);
    xmlHttp.setRequestHeader('authorization', JWT);
    xmlHttp.send();
  }

  loadPage = () => {
    if (localStorage["guestMode"] == "true") {
        this.view.showName("guest", "", "");
        var inf = JSON.parse(localStorage["guestInf"]);
        this.view.hideBtn();
    }
    else {
        var inf = JSON.parse(localStorage["information"]);
        if (!inf) return;
        var fName = inf.firstName;
        var LName = inf.lastName;
        var UName = inf.username;
        this.View.showName(fName, LName, UName);
    }
    this.Model.todos.set(inf.list);
    if (localStorage["TODOS"]) {
        changeStateButton(Number(localStorage["TODOS"]));
    }
    else
        changeStateButton(0);
}

  }
  
  const app = new Controller(new Model(), new View())
  