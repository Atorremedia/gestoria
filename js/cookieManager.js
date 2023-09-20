function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function ShowCookiesBanner(){
    let cookies = getCookie("cookies")
    if (cookies =="") {
        document.getElementById("cookie_banner").style.display = "block"
    } else {
        document.getElementById("cookie_banner").style.display = "none"
    }
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(document.cookie)
  }
function AcceptAllCookies() {
    setCookie("cookies", "accepted", 365 )
    document.getElementById("cookie_banner").style.display = "none"
}
function AcceptRestrictedCookies() {
    setCookie("cookies", "restricted", 365 )
    document.getElementById("cookie_banner").style.display = "none"
    console.log('Restricted cookies accepted')
}
function ConfigureCookies() {
    document.getElementById("config_cookies").style.display = "block"
    console.log('cookies configuration')
}
function RejectCookies() {
    setCookie("cookies", "rejected", 365 )
    document.getElementById("cookie_banner").style.display = "none"
    console.log('cookies rejected')
}

ShowCookiesBanner()