import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CompositionBar__container {
    display: flex;
    flex: 2;
    width: 100%;
    position: relative;
    cursor: default;
    z-index: 10;
    &:hover {
      z-index: 12;
    }
  }

  .CompositionBar__wrapper {
    height: 20px;
    border-radius: 20px;
    width: 100%;
    overflow: hidden;
    @include respond-to(xl) {
      height: 16px;
    }
    @include respond-to(lg) {
      height: 12px;
    }
    @include respond-to(md) {
      height: 16px;
    }
  }

  .CompositionBar {
    display: flex;
    flex-direction: row;
    flex: 2;
    height: 20px;
    width: 99.999%;
    border-radius: 25px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background: #f5f5f5;
    @include respond-to(xl) {
      height: 16px;
    }
    @include respond-to(lg) {
      height: 10px;
    }
    @include respond-to(md) {
      height: 16px;
    }
  }

  .CompositionBar__item {
    position: relative;
    cursor: pointer;
    transition: $transition;
  }

  .CompositionBar__item-optionsWrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 99.999%;
    height: 20px;
    z-index: -1;
    display: flex;
    flex-direction: row;
    @include respond-to(xl) {
      height: 16px;
    }
    @include respond-to(lg) {
      height: 10px;
    }
    @include respond-to(md) {
      height: 16px;
    }
  }

  .CompositionBar__item-optionInner {
    position: relative;
    border-radius: 20px;
    transition: all 0.3s ease;
  }

  .CompositionBar__item:first-child {
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
  }

  .CompositionBar__item:last-child {
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
  }

  .CompositionBar__itemOptionInnerHover {
    box-shadow: 0 0 15px;
  }
  .CompositionBar__itemNonHover {
    box-shadow: none !important;
  }

  .CompositionBar__item-option {
    cursor: default;
    position: absolute;
    top: 140%;
    left: 50%;
    transform: scale(0.9) translateX(-55%);
    transition: all 0.3s ease;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    z-index: 5;
    min-width: 150px;
  }
  .CompositionBar__token-icon {
    img {
      margin-right: 0 !important;
    }
  }

  .CompositionBar__itemOptionOpen {
    display: flex;
  }

  .CompositionBar__item-option:after {
    content: '';
    width: 1px;
    height: 15px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 100%;
  }

  .CompositionBar__item__small .CompositionBar__item-option {
    left: 5%;
    transform: scale(0.9) translateX(-15%);
  }
  .CompositionBar__item__small .CompositionBar__item-option:after {
    right: auto;
    left: 10%;
    transform: translateX(0);
  }

  .CompositionBar__item__smallLast .CompositionBar__item-option {
    left: auto;
    right: -30px;
    transform: scale(0.9) translateX(0);
  }
  .CompositionBar__item__smallLast .CompositionBar__item-option:after {
    right: 17%;
    left: auto;
  }

  .CompositionBar__item__smallFirst .CompositionBar__item-option {
    left: 5%;
    transform: scale(0.9) translateX(-15%);
  }
  .CompositionBar__item__smallFirst .CompositionBar__item-option:after {
    right: auto;
    left: 10%;
    transform: translateX(0);
  }

  .Item__token-inner {
    display: flex;
    align-items: center;
  }

  .CompositionBar__item-option .Item__title {
    margin: 0 25px 0 5px;
    font-size: $medium;
  }

  .Item__value {
    font-weight: 600;
    font-size: $medium;
    line-height: 1;
    margin: 0;
    display: flex;
    align-items: center;
  }

  .Item__value p {
    margin-right: 5px;
    font-weight: 400;
  }

  .CompositionBar__rest-percentage {
    position: relative;
    transition: all 0.3s ease;
    border-radius: 20px;
    p {
      font-weight: 600;
      font-size: $regular;
      line-height: 1;
    }
    b {
      font-size: $medium;
      margin: 0 0 0 10px;
    }
    span {
      font-weight: 600;
      font-size: $medium;
    }
  }

  .CompositionBar__rest-percentage:hover {
    cursor: pointer;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

export default staticStyles;
