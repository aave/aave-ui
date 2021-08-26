import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .HistoryContent {
    display: flex;
    flex-direction: column;
    flex: 1;

    &__button-inner {
      margin-bottom: 10px;
      @include respond-to(sm) {
        display: none;
      }
      .DefaultButton {
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
        }
      }
    }

    &__items-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .HistoryContent__value {
      font-weight: 300;
      .Value__symbol {
        font-weight: 300;
      }
      .SubValue__symbolUSD {
        display: inline-block;
      }
    }
  }
`;

export default staticStyles;
