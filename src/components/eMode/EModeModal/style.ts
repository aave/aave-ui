import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .EModeModal {
    &__content {
      a {
        font-weight: 500;
      }

      &--info {
        padding: 16px;
        margin-bottom: 32px;
      }

      &--note {
        font-size: $medium;
        padding: 8px;
        @include respond-to(xl) {
          font-size: $small;
        }
        margin-bottom: 48px;
      }

      .DefaultButton {
        margin: 0 auto;
      }
    }
  }
`;

export default staticStyles;
