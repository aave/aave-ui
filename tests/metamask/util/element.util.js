class ElementUtil{

    doClick(elem, timeout=50000){
        elem.waitForDisplayed({
            timeout: timeout
        })
        elem.waitForClickable({
            timeout: timeout
        })
        elem.click()
    }

    doClickWithRedirect(elem, timeout=50000){
        let oldUrl = browser.getUrl()
        elem.waitForDisplayed()
        elem.waitForClickable()
        elem.click()
        browser.waitUntil(
            () => oldUrl != browser.getUrl(),
            {
                timeout: timeout,
                timeoutMsg: 'expected url to be different'
            }
        )
    }

    doSetValue(elem, value){
        elem.waitForDisplayed()
        elem.setValue(value)
    }

    doGetText(elem){
        elem.waitForDisplayed()
        return elem.getText()
    }

    doGetPageTitle(){
        return browser.getTitle()
    }

    doIsDisplayed(elem,timeout=50000){
        elem.waitForExist({ timeout: timeout })
        elem.waitForDisplayed()
        return elem.isDisplayed()
    }

    doIsExist(elem,timeout=50000){
        return elem.waitForExist({ timeout: timeout })
    }

    doClearValue(elem){
        elem.doubleClick()
        elem.keys(['Control', 'a'])
        elem.keys('Delete')
    }

    doDropDownSelect(elem, value) {
        elem.waitForDisplayed()
        elem.click()
        browser.pause(1000)
        let valueXpath = '//*[text()="'+value+'"]'
        $(valueXpath).click()
    }
}

module.exports = new ElementUtil()