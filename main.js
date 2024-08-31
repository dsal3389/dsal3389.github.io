
// type alias sleep so we can actually sleep in stupid javascript
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeWriterAnimation(element, text) {
    let i = 0;

    // remove characters
    while (element.innerText) {
        element.innerText = element.innerText.slice(0, -1);
        await sleep(150);
    }

    // add characters
    while (i < text.length) {
        element.textContent += text.charAt(i++);
        await sleep(50);
    }
}

// simple function cycling a list of titles
// with the typewriter effect
async function cycleTitles() {
    const element = document.getElementById("title");
    const titles = [
        "Software developer", 
        "Full stack", 
        "Network engineer", 
        "Python developer", 
        "Rust developer", 
        "C developer"
    ];
    let i = 0;

    while (true) {
        if (i >= titles.length) {
            i = 0;
        }

        let value = titles[i++];
        await typeWriterAnimation(element, value);
        await sleep(1500);
    }
}

(async function() {
    cycleTitles();

    const responses = await Promise.all([fetch("./data/left-pane.json"), fetch("./data/right-pane.json")]);
    const [left, right] = await Promise.all([responses[0].json(), responses[1].json()]);

    typeWriterAnimation(document.getElementById("description"), left.description);

    for (let skill of right.skills) {
        const div = document.createElement("div");
        const p = document.createElement("p");
        p.innerText = skill.name;

        div.appendChild(p);
        div.classList.add("chips");
        document.getElementById("skills").appendChild(div);
    }
})();