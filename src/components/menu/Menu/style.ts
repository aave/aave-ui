import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: relative;
    z-index: 5;
    height: 50px;
    @include respond-to(sm) {
      padding: 0;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
      border: none;
      height: auto;
      min-height: 50px;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      @include respond-to(sm) {
        display: none;
      }
    }

    &__logo-inner {
      img {
        width: 72px;
        height: 20px;
      }
      @include respond-to(sm) {
        display: none;
      }
    }

    &__back-button {
      position: absolute;
      padding: 15px;
      left: 0;
      img {
        width: 20px;
        height: 20px;
      }
    }

    &__title-inner {
      display: none;
      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        padding: 0 50px;
      }
      p {
        font-size: $regular;
        text-transform: uppercase;
      }
    }

    &__right-inner {
      display: flex;
      align-items: center;
    }

    &__navigation-inner {
      margin-right: 40px;
      @include respond-to(xl) {
        margin-right: 30px;
      }
      @include respond-to(lg) {
        margin-right: 20px;
      }
      @include respond-to(md) {
        display: none;
      }
      ul {
        display: flex;
        align-items: center;
        .Menu__link-inner {
          margin-left: 40px;
          @include respond-to(xl) {
            margin-left: 30px;
          }
          @include respond-to(lg) {
            margin-left: 20px;
          }
        }
      }
    }

    &__linkHidden {
      display: none;
    }

    &__burger-inner {
      display: none;
      @include respond-to(md) {
        display: block;
        margin-right: 5px;
      }
      @include respond-to(sm) {
        margin-right: 0;
        position: absolute;
        right: 0;
      }
    }

    &__buttons-inner {
      display: flex;
      align-items: center;
      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
