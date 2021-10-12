import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CircleCompositionBar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    position: relative;
    @include respond-to(xl) {
      width: 120px;
      height: 120px;
    }
    @include respond-to(lg) {
      width: 100px;
      height: 100px;
    }
    @include respond-to(md) {
      width: 120px;
      height: 120px;
    }

    &__title {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      left: 11%;
      right: 11%;
      top: 11%;
      bottom: 11%;
      border-radius: 50%;
      z-index: 2;
      position: absolute;

      p {
        font-size: $large;
        font-weight: 300;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $small;
        }
      }
    }
  }
`;

export default staticStyles;
