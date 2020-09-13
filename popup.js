document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("button");
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5000/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        data = {
            email,
            password
        };
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status === 200) {
                const response = JSON.parse(this.responseText);
                chrome.storage.sync.set(response, function () {
                    document.getElementById("container").innerHTML =
                        "login successful";
                });
            }
        };
    });
});
