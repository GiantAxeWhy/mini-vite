(() => {
  // public/sub-module.js
  function subModule(app2) {
    console.log("this is a subModule22");
    app2.innerHTML += "<Br/> this is a subModule";
  }

  // public/main.js
  var app = document.getElementById("app");
  if (app) {
    app.innerText = "Hello3 World";
  }
  subModule(app);
})();
