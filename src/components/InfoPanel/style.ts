import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .InfoPanel {
    width: 100%;
    padding: 10px;
    border-radius: $borderRadius;
    position: relative;

    &__circle {
      position: absolute;
      left: -20px;
      top: -20px;
      width: 40px;
      height: 40px;
      @include respond-to(xl) {
        left: -16px;
        top: -16px;
        width: 32px;
        height: 32px;
      }
      @include respond-to(lg) {
        left: -12px;
        top: -12px;
        width: 24px;
        height: 24px;
      }
      @include respond-to(sm) {
        left: auto;
        top: -16px;
        right: 3px;
        width: 32px;
        height: 32px;
      }
    }

    &__content-inner {
      display: flex;
      align-items: flex-start;
    }
    &__ghost {
      width: 21px;
      height: 30px;
      margin-right: 10px;
      @include respond-to(xl) {
        width: 17px;
        height: 24px;
      }
    }
    &__content {
      flex: 1;
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
    }
  }
`;

export default staticStyles;
