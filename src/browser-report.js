module.exports = class BrowseReport {
    constructor() {
        this.ip = null
        this.getUserIp()
    }

    export() {
        return {
            "browser": this.getBrowser(),
            "isCookiesAllowed": this.getIsCookiesAllowed(),
            "browserWidth": this.getWidth(),
            "browserheight": this.getHeight(),
            "screenWidth": this.getScreenWidth(),
            "screenHeight": this.getScreenWidth(),
            "userIp": this.ip
        }
    }
    getBrowser() {
        return navigator.userAgent
    }
    getIsCookiesAllowed() {
        return (document.cookie.indexOf(document.cookie) >= 0)
    }

    getWidth() {
        return window.innerWidth || document.documentElement.width
    }

    getHeight() {
        return window.innerHeight
    }

    getScreenWidth() {
        return screen.width
    }

    getScreenHeight() {
        return screen.height
    }

    getUserIp() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) 
                this.ip = request.responseText
        }
        request.open("GET", 'https://api.ipify.org?format=text', true); // true for asynchronous 
        request.send(null);
    }

}