// let urlId=window.location.search.split("=")
// urlId=urlId[urlId.length-1];
const objectId = localStorage.getItem("currentObjectId")
let myToken=localStorage.getItem(`emperor`)
  if (!myToken) {
    window.location.href="login.html"
  }
  if (!objectId) {
    window.location.href="adminindex.html"
  }

async function getObject(){
    const result = await fetch(
      `https://hassanwebapi.herokuapp.com/users/customer/${objectId}`,{
        headers:{
          'Authorization': `Bearer ${myToken}`
        }
      }
      
      ).then(response=> response.json())
    console.log(result);
    //update fullname
    document.getElementById("fullname").value = result.fullname
    document.getElementById("email").value = result.email
    document.getElementById("gender").value = result.gender
    document.getElementById("phone").value = result.phone
    document.getElementById("address").value = result.address
    document.getElementById("notes").value = result.notes
}

getObject()

document
.querySelector("#update-customer-form")
.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formElement = document.getElementById("update-customer-form");
  const formData = new FormData(formElement);
  
  const customer = {};
  for (let key of formData.keys()) {
    customer[key] = formData.get(key);
  }
  
  const res = await callApi(objectId, "PUT", customer);
  console.log("hassan:",res);
  if (res["status"] === "success") {
      
    window.alert("Customer updated successfully");
    window.location.href = "index.html";
  } else {
    window.alert('status is not successful',res.response);
  }
});

async function callApi(objectId, method, body) {
    if (method === "GET") {
      const response = await fetch(
        
        `https://hassanwebapi.herokuapp.com/users/customer/${objectId}`,
        {
          headers:{
            'Authorization': `Bearer ${myToken}`
          }
        }
      );
      return await response.json();
    } else {
      const response = await fetch(
        `https://hassanwebapi.herokuapp.com/users/customer/${objectId}`,
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
  
