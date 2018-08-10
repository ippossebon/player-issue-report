class BrowseReport {

    export() {
        return {
            "browser": this.getBrowser(),
            "isCookiesAllowed": this.getIsCookiesAllowed(),
            "browserWidth": this.getWidth(),
            "browserheight": this.getHeight(),
            "screenWidth": this.getScreenWidth(),
            "screenHeight": this.getScreenHeight()
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
}