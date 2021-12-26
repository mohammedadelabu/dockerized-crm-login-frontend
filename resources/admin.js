
async function callApi(path, method, body) {
  let myToken=localStorage.getItem(`emperor`)
  if (!myToken) {
    window.location.href="login.html"
  }
  if (method === "GET") {
    const response = await fetch(
      `https://hassanwebapi.herokuapp.com/users/customer${path}`,
      {
        headers:{
          'Authorization': `Bearer ${myToken}`
        }
      }  
    );
    return await response.json();
  } else {
    const response = await fetch(
      `https://hassanwebapi.herokuapp.com/users/customer${path}`,
      {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${myToken}`
        },
      }
    );
    return await response.json();
  }
}


const ready = document.querySelector("#accordion");
if (ready) {

    // ADD CUSTOMERS
  document
    .querySelector("#add-customer-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const formElement = document.getElementById("add-customer-form");
      const formData = new FormData(formElement);

      const customer = {};
      for (let key of formData.keys()) {
        customer[key] = formData.get(key);
      }

      const res = await callApi("", "POST", customer);
      console.log(res);
      if (res["status"] === "success") {
        window.alert("Customer added successfully");
        window.location.href = "index.html";
      } else {
        window.alert(res.response);
      }
    });
}
    
  // DELETE CUSTOMERS
  
  if (!myToken) {
    window.location.href="login.html"
  }

  async function deleteCustomer(id){
    let myToken=localStorage.getItem(`emperor`)

          let response=await fetch(
            `https://hassanwebapi.herokuapp.com/users/customer/${id}`, 
            {
              headers:{
                'Authorization': `Bearer ${myToken}`
              },
              method: "DELETE"
            }
          );
    
    let result= await response.json()
    console.log(result);
    alert(result.data)
    location.reload()
  }
  
  