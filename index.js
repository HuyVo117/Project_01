// console.clear();

let contentTitle;

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = "product/" + ob.id;
  // console.log('link=>' + boxLink);

  let imgTag = document.createElement("img");
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("VNĐ  " + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicClothingSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");
// mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// BACKEND CALLING
// httpRequest.open(
//   "GET",
//   "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
//   true
// );
// httpRequest.send();

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSsxNHL-vaqMMnVoya19qYkWWyHD6y9KXXbWkO7xWE9I665bdEpidMtHM7QhUs_iJSaIhOF2HSOEPTt/pubhtml")
.then(res => res.text())
.then(res => {
  let table = document.createElement('div');
  let table_content = res.slice(res.indexOf("<table"), res.indexOf("table>") + 6)
  table.innerHTML = table_content
  let rows = convert(table.childNodes[0])
  console.log(rows)

  contentTitle = rows

  let cart_infor = JSON.parse(window.localStorage.getItem("cart_infor") ? window.localStorage.getItem("cart_infor") : JSON.stringify({"list": []}))
  document.getElementById("badge").innerHTML = cart_infor.list.length

  for (let i = 0; i < contentTitle.length; i++) {
    if (contentTitle[i].is_accessory === "t") {
      console.log(contentTitle[i]);
      containerAccessories.appendChild(
        dynamicClothingSection(contentTitle[i])
      );
    } else {
      console.log(contentTitle[i]);
      containerClothing.appendChild(
        dynamicClothingSection(contentTitle[i])
      );
    }
  }
})
