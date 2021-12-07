import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .HealthFactorSection {
    flex-direction: column;

    &__content {
      width: 100%;
      @include respond-to(md) {
        margin-top: 10px;
      }
    }
  }
`;

export default staticStyles;
