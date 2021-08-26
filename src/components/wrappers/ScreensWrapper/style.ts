import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ScreensWrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;

    &__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: auto;
      overflow-x: hidden;
      position: relative;
      z-index: 2;
    }

    &__top-contentWrapper {
      position: relative;
      @include respond-to(sm) {
        display: none;
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 110px;
        width: 100%;
        transition-property: height;
        transition-duration: 0.1s;
        transition-timing-function: ease-in-out;
      }
    }

    &__topPanelSmall {
      .ScreensWrapper__top-contentWrapper {
        &:after {
          height: 80px;
        }
      }
    }

    &__background {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      object-fit: cover;

      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
