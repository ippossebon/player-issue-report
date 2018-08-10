var BrowseReport = require('./../src/browser-report')
var test = require('unit.js')

var browseReport = new BrowseReport()

navigator = {
    "userAgent" : "bla"
}
document = {
    "documentElement" : {
        "width" : "100",
        "height" : "100"
    }
}
window = {
    "innerHeight" : "0",
    "innerWidth" : "0"
}

screen =  {
    height : "120",
    width : "120"
}

test.string("bla").is(browseReport.getBrowser())
test.string("0").is(browseReport.getWidth())
test.string("0").is(browseReport.getWidth())
test.string("0").is(browseReport.getHeight())
test.string("120").is(browseReport.getScreenWidth())
test.string("120").is(browseReport.getScreenHeight())

window.innerWidth = "100"
test.string("100").is(browseReport.getWidth())

screen.height = "100"
test.string("100").is(browseReport.getScreenHeight())


