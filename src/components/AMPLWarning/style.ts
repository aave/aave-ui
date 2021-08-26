import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AMPLWarning {
    b {
      font-weight: 400;
    }

    &__text {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      width: 100%;
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(sm) {
        font-size: $medium;
        position: static;
        margin-bottom: 10px;
      }
      b {
        font-weight: 600;
      }
    }
  }
`;

export default staticStyles;
