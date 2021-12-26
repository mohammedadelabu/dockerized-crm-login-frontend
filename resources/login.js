    async function login() {
        let email=document.getElementById('emaillog').value
        let password=document.getElementById('passlog').value
        let loginObj=JSON.stringify({email,password},null,4)
        console.log(email,password,loginObj);

        let response = await fetch("https://hassanwebapi.herokuapp.com/users/login", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: loginObj
        });
        let result = await response.json();
        console.log(result);

        // localStorage.removeItem('clpapp')
        localStorage.setItem(`emperor`,result.token)
        let mytoken=localStorage.getItem(`emperor`)
        console.log(mytoken);
        location.href="index.html"
      }


      function logoutUser() {
        localStorage.removeItem('emperor')
        location.href="login.html"
      }