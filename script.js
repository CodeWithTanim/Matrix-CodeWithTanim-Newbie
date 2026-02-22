const terminalOutput = document.getElementById('terminalOutput');

const terminalData = [
    {
        command: "identity",
        response: ["MD SAMIUR RAHMAN TANIM | CodeWithTanim"]
    },
    {
        command: "profile --extended",
        response: [
            "Role : B.Tech CSE Student & Freelance Developer",
            "Focus : Programming | Automation | Cyber Security",
            "Experience : Self-Taught & Project Based"
        ]
    },
    {
        command: "environment",
        response: [
            "Location : India / Bangladesh",
            "Platform : Windows / Linux / Android / Termux",
            "University : adtU CSE (6th Semester)"
        ]
    },
    {
        command: "skills",
        response: [
            "<ul>\
                <li>Python Development & Automation</li>\
                <li>Telegram Bot Development</li>\
                <li>GitHub & Open Source Projects</li>\
                <li>Cyber Security Learning</li>\
            </ul>"
        ]
    },
    // {
    //     command: "social --links",
    //     response: [
    //         "GitHub    : github.com/CodeWithTanim",
    //         "YouTube   : youtube.com/@codewithtanim",
    //         "Instagram : instagram.com/codewithtanim",
    //         "Twitter/X : x.com/codewithtanim",
    //         "Telegram  : t.me/CodeWithTanim",
    //         "Discord   : dBeddEAhRJ"
    //     ]
    // },
    {
        command: "philosophy",
        response: ["Learn. Build. Share. Repeat. — CodeWithTanim"]
    }
];


// Typing Configuration
const typeSpeed = 40;
const lineDelay = 600;
const commandDelay = 1200;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function typeCommand(commandStr, container) {
    const promptSpan = document.createElement('div');
    promptSpan.className = 'prompt';
    promptSpan.innerHTML = `root@sys:~$ `;
    container.appendChild(promptSpan);

    const textSpan = document.createElement('span');
    promptSpan.appendChild(textSpan);

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.innerHTML = '&nbsp;';
    promptSpan.appendChild(cursor);

    for (let i = 0; i < commandStr.length; i++) {
        textSpan.innerHTML += commandStr.charAt(i);
        await sleep(typeSpeed + (Math.random() * 20));
    }

    cursor.remove();
}

async function showResponse(responseLines, container) {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'response';

    if (responseLines.length === 1 && responseLines[0].startsWith('<')) {
        responseDiv.innerHTML = responseLines[0];
    } else {
        responseDiv.innerHTML = responseLines.join('<br>');
    }

    container.appendChild(responseDiv);
    container.scrollTop = container.scrollHeight;
}

async function runTerminal() {
    for (const item of terminalData) {
        await typeCommand(item.command, terminalOutput);
        await sleep(lineDelay);
        await showResponse(item.response, terminalOutput);
        await sleep(commandDelay);
    }

    const finalPrompt = document.createElement('div');
    finalPrompt.className = 'prompt';
    finalPrompt.innerHTML = `root@sys:~$ <span class="cursor">&nbsp;</span>`;
    terminalOutput.appendChild(finalPrompt);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}


/* Boot Loader */

const bootMessages = [
    { status: "INIT", text: "Initializing developer environment..." },
    { status: "OK", text: "System modules loaded" },
    { status: "INIT", text: "Authenticating user: CodeWithTanim" },
    { status: "OK", text: "Access granted" },
    { status: "INIT", text: "Loading portfolio data..." },
    { status: "OK", text: "Profile ready" },
    { status: "DONE", text: "Launching interactive console" }
];

async function handleLoader() {
    const loader = document.getElementById('loader');
    const bootSequence = document.getElementById('bootSequence');
    const progressBar = document.getElementById('progressBar');

    for (let i = 0; i < bootMessages.length; i++) {
        const msg = bootMessages[i];

        const line = document.createElement('div');
        line.className = 'boot-line';
        line.innerHTML = `<span class="bracket">[</span> <span class="status">${msg.status}</span> <span class="bracket">]</span><span class="text">${msg.text}</span>`;

        bootSequence.prepend(line);

        void line.offsetWidth;
        line.classList.add('visible');

        const progress = Math.floor(((i + 1) / bootMessages.length) * 100);
        progressBar.style.width = `${progress}%`;

        const delay = Math.floor(Math.random() * 400) + 400;
        await sleep(delay);
    }

    await sleep(1000);
    loader.classList.add('hidden');

    setTimeout(() => {
        loader.style.display = 'none';
        runTerminal();
    }, 800);
}

window.addEventListener('DOMContentLoaded', () => {
    handleLoader();
});