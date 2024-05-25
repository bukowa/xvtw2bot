const $script = document.createElement('script');
const $script3 = document.createElement('link');
const $script2 = document.createElement('script');


$script3.rel = "stylesheet"
$script3.href = chrome.runtime.getURL('index.css');
document.body.appendChild($script3);
$script3.setAttribute("defer", "defer");

$script2.src = chrome.runtime.getURL('main.js');
$script2.setAttribute("defer", "defer");
document.head.appendChild($script2);

$script.src = chrome.runtime.getURL('index.js');
$script.setAttribute("defer", "defer");
document.body.appendChild($script);

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElm('#toolbar-left').then((elm) => {
    console.log('Element is ready');
    console.log(elm.textContent);
});

const app = document.createElement("div")
app.setAttribute("id", "app")
//app.setAttribute("class", "twx-window left")

document.getElementById("wrapper").appendChild(app)

//
// const url = chrome.runtime.getURL('index.html');
//
// console.log("fetching url")
// fetch(url).then(response => {
//     response.text().then(function(text){
//         console.log(text)
//         d = document.createElement("div")
//         d.innerHTML = text
//         document.getElementById("toolbar-left").appendChild(d)
//         console.log(d)
//     })
// })
