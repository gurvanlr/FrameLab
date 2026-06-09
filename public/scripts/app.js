
let user = undefined;

async function getUser() {
    if (user == undefined) {
        const resp = await fetch("/api/users/me", { credentials: "include" });
        user = await resp.json();
    }
    return user;
}

async function includes(path) {
    const currentScript = document.currentScript;
    const div = document.createElement('div');
    const res = await fetch(path);
    div.innerHTML = await res.text();
    for (const node of div.childNodes) {
        if (node.tagName == "SCRIPT") {
            const script = document.createElement('script');
            script.innerHTML = node.innerHTML;
            document.head.append(script);
        } else {
            currentScript.insertAdjacentElement('beforebegin', node);
        }
    }
    currentScript.remove();
}