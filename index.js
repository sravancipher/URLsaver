let urls=[]
const inputurl=document.getElementById("input-url")
const savebtn=document.getElementById("save-btn")
const urlslist=document.getElementById("urls-list")
const date=document.getElementById("input-date")
const today=new Date()
const deletebtn=document.getElementById("delete-btn")
const tabbtn=document.getElementById("tab-btn")
const urlsfromlocalstorage=JSON.parse(localStorage.getItem("urls"))
localStorage.clear()
if(urlsfromlocalstorage)
{
    urls=urlsfromlocalstorage
    renderurls()
}
savebtn.addEventListener("click",function()
{
    urls.push(inputurl.value)
    inputurl.value=""
    localStorage.setItem("urls",  JSON.stringify(urls))
    renderurls()
}
)
tabbtn.addEventListener("click",function()
{
    chrome.tabs.query({active:true,currentWindow:true},function(tabs)
    {
        urls.push(tabs[0].url)
        localStorage.setItem("urls",JSON.stringify(urls))
        renderurls()
    })
})
function renderurls()
{
    urlslist.innerHTML=""
    for(let i=0;i<urls.length;i++)
    {
        urlslist.innerHTML+=
        `
        <li>
           <a href='${urls[i]}' target='_blank'> ${urls[i]} </a>
        </li>
        `
    }
    /*if(today>date.value)
    {
        alert("above the date")
    }
    else if(today<date.value)
    {
        alert("below the date")
    }
    else
    {
        alert("today date")
    }*/
}
deletebtn.addEventListener("dblclick",function()
{
    localStorage.clear()
    urlslist.innerHTML=""
    urls=[]
    renderurls()
}
)