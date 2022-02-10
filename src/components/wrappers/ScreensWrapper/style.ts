import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ScreensWrapper {
    .poweredBy {
      text-align: center;
      padding: 50px 0 15px;
      p {
        opacity: 0.5;
        font-family: Roboto;
        font-size: 10px;
        color: #000;
        padding-top: 5px;
      }
    }
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
        height: 360px;
        width: 100%;
        transition-property: height;
        transition-duration: 0.1s;
        transition-timing-function: ease-in-out;
        background: url(https://cdn.zeplin.io/5afea5f00c00fb5338104350/assets/D0B61A06-76CB-4465-A659-D5357526D754.png);
        background-size: cover;
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
