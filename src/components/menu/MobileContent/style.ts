import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MobileContent {
    z-index: 35;

    &__overlay {
      opacity: 0;
      height: 0;
      overflow: hidden;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: opacity 0.3s ease;
      background: #000;
      z-index: 34;
    }
    &__overlayActive {
      height: 100%;
      opacity: 0.5;
    }

    &__button {
      padding: 15px 15px;
      display: inline-block;
      cursor: pointer;
      transition-property: opacity, filter;
      transition-duration: 0.15s;
      transition-timing-function: linear;
      font: inherit;
      color: inherit;
      text-transform: none;
      background-color: transparent;
      border: 0;
      margin: 0;
      overflow: visible;
    }

    &__buttonActive {
      .MobileContent__button-inner {
        transform: translate3d(0, 10px, 0) rotate(45deg);
        margin-top: -3px;
        &:before {
          transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
          opacity: 0;
        }

        &:after {
          transform: translate3d(0, -20px, 0) rotate(-90deg);
          top: 20px;
          opacity: 1;
        }
      }

      .MobileContent__button-inner,
      .MobileContent__button-inner:before,
      .MobileContent__button-inner:after {
        width: 22px;
      }
    }

    &__button-box {
      width: 20px;
      height: 20px;
      display: inline-block;
      position: relative;
    }

    &__button-inner {
      display: block;
      top: 2px;
      margin-top: -1px;

      &:before,
      &:after {
        content: '';
        display: block;
      }

      &:before {
        top: 9px;
        transition-property: transform, opacity;
        transition-timing-function: ease;
        transition-duration: 0.15s;
        opacity: 0.6;
      }

      &:after {
        top: 18px;
        opacity: 0.2;
      }
    }

    &__button-inner,
    &__button-inner:before,
    &__button-inner:after {
      width: 20px;
      height: 2px;
      border-radius: $borderRadius;
      position: absolute;
      transition-property: transform;
      transition-duration: 0.15s;
      transition-timing-function: ease;
    }

    .MobileContent__content-wrapper.DropdownWrapper__content {
      width: 340px;
      box-shadow: 2px 0 6px 0 rgba(0, 0, 0, 0.16);
      position: fixed;
      left: auto;
      right: -360px;
      top: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: auto;
      transition: right 0.3s ease;
      opacity: 1;
      transform: scaleY(1);
    }
    .MobileContent__content-wrapper.DropdownWrapper__contentVisible {
      right: 0;
    }

    &__top {
      display: none;
      @include respond-to(sm) {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
      }
      &:after {
        bottom: 0;
      }
    }

    &__navigation {
      padding: 40px 0 30px;
      @include respond-to(sm) {
        padding: 30px 0;
      }
      ul {
        .MobileContent__link-wrapper {
          margin-bottom: 20px;
          @include respond-to(sm) {
            margin-bottom: 10px;
          }
          &:last-of-type {
            margin: 0;
          }
        }
        .MobileContent__linkHidden {
          display: none;
        }
      }
    }

    &__link {
      font-weight: 300;
      text-transform: uppercase;
      font-size: $extraLarge;
      width: 100%;
      text-align: center;
      padding: 10px 0;
    }
    &__linkActive {
      font-weight: 600;
    }

    &__bottom {
      padding: 30px 0 35px;
      &:after {
        top: 0;
      }
    }

    &__bottom,
    &__top {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        left: 0;
        height: 1px;
        opacity: 0.2;
      }
    }

    &__lang-switcher {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
    }

    &__bottom-links {
      margin-bottom: 40px;
    }

    &__social-icons {
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        margin: 0 10px;
      }
    }
  }
`;

export default staticStyles;
