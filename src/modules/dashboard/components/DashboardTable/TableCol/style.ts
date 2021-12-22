import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableCol {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    min-width: 110px;
    overflow: hidden;
    padding: 2px;
    @include respond-to(md) {
      padding: 0;
    }
  }

  .TableValueCol__value {
    align-items: center;
    .Value__value {
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $small;
      }
    }
    .SubValue {
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
    }
  }
`;

export default staticStyles;
