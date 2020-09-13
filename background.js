chrome.contextMenus.create({
    id: "SmartNote",
    title: "Save Note",
    contexts: ["selection"],
    onclick: clicked
});

function clicked(info, tab) {
    try {
        chrome.storage.sync.get("idToken", function (obj) {
            const idToken = obj.idToken;
            data = {
                title: "",
                content: info.selectionText
            };
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:5000/note/");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("idToken", idToken);
            xhr.send(JSON.stringify(data));
            xhr.onreadystatechange = function () {
                if (
                    this.readyState == XMLHttpRequest.DONE &&
                    this.status === 201
                ) {
                    console.log("note saved");
                }
            };
        });
    } catch (e) {}
}
