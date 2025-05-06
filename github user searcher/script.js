let arr = new Array();
var remove = document.querySelector(".remove-btn");
var submit = document.querySelector(".submit");
var inp = document.querySelector(".inp-text");
var form = document.querySelector("form");
var error = document.querySelector(".error");
var container = document.querySelector(".container");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Form submit ko rokne ke liye
  if (inp.value.trim() === "") {
    error.textContent = "Some fields are empty";
    error.style.fontWeight = 300;
    error.style.color = "red";
    return;
  }

  let name = inp.value.trim(); // Input ko trim karke save karo
  error.textContent = ""; // Error message hatao

  fetch(`https://api.github.com/users/${name}`)
    .then((res) => {
      if (!res.ok) {
        error.textContent = "Some fields are empty";
        error.style.fontWeight = 300;
        error.style.color = "red";

        throw new Error("Invalid user or not found");
      }
      return res.json();
    })
    .then((data) => {
      // Card ka HTML with individual remove button
      const cardHtml = `
        <div class="card">
        <div class="image-container">
            <img src="${data.avatar_url}" alt="${
        data.name || "User"
      } ka avatar" />
        </div>
        <div class="info-cont">
            <h3>ID: ${data.id}</h3>
            <h1>Name: ${data.name || "N/A"}</h1>
            <p>Bio: "${data.bio || "No bio available"}"</p>
            <h4>Public Repos: ${data.public_repos}</h4>
            <h5>
            <a href="https://github.com/${name}">Github-link: https://github.com/${name}</a>
            </h5>
            <button class="card-remove-btn">Remove Card</button>
        </div>
        </div>`;

      // Container mein card append karo
      container.innerHTML += cardHtml;

      // Array mein card HTML save karo
      arr.push(cardHtml);
      console.log(arr);

      // Input field clear karo
      inp.value = "";

      // Har card ke remove button pe event listener add karo
      document.querySelectorAll(".card-remove-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const card = this.closest(".card");
          card.remove(); // Sirf yeh card remove karo
          // Array se bhi remove karo
          arr = arr.filter((item) => item !== cardHtml);
          console.log(arr);
        });
      });
    })
    .catch((err) => {
      error.textContent = "Error: " + err.message;
      error.style.color = "red";
    });
});

// Global remove button for all cards (tumhara original remove button)
remove.addEventListener("click", function () {
  container.innerHTML = ""; // Container khali kar do
  arr = []; // Array bhi khali kar do
});

