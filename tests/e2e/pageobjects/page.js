const config = require('../../config');

module.exports = class Page {
    open (path) {
        if(path){
            return browser.url(config.URL+`${path}`)
        }else{
            return browser.url(config.URL)
        }
    }
    doSetupLocalStorage(key, value){
      browser.execute("localStorage.setItem('"+key+"', '"+value+"')");
      browser.refresh();
    }
    doTextIsDisplayed(text, timeout = 10000){
        let _xpath = `//*[text()="${text}"]`
        $(_xpath).waitForExist({timeout:timeout})
        expect($(_xpath).isExisting()).to.be.equal(true)
    }
    doCheckUrlIs(expectedUrl){
        expect(browser.getUrl()).to.be.equal(expectedUrl)
    }
    doOpenNewTab(url){
        browser.newWindow(url)
    }
    doSwitchToTab(urlOrTitleToMatch){
        browser.switchWindow(urlOrTitleToMatch)
    }
    doCloseTab(){
        browser.closeWindow()
    }
    doCheckUrlIs(expectedUrl){
        expect(browser.getUrl()).to.be.equal(expectedUrl)
    }
    doIsTextDisplay(text){
        let _xpath = `//*[text()="${text}"]`
        let count = $$(_xpath).length
        if(count > 0)
            return true
        else
            return false
    }
    doSetSize(width,height){
        browser.setWindowSize(width,height)
    }
}
