function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
      let actualLocation = window.location.href;
      let newLocation = actualLocation.replace("login", "auth");
      gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'clear',
      'onsuccess': onSuccess,
      'onfailure': onFailure,
      'redirect_uri': newLocation
    });
  }