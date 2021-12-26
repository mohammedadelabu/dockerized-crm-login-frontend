async function register() {
    let fullname = document.getElementById('fullnamelog').value
    let email=document.getElementById('emaillog').value
    let password=document.getElementById('passlog').value
    let regObj=JSON.stringify({fullname,email,password},null,4)
    console.log(fullname,email,password,regObj);

    let response = await fetch("https://hassanwebapi.herokuapp.com/users/register", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: regObj
    });
    let result = await response.json();
    console.log(result);
    if(result.status='signup successfull'){
      location.href="login.html"
    }else{
      window.alert('Account already exist')
    }
  }
