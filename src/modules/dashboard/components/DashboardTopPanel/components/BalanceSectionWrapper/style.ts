import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BalanceSectionWrapper {
    flex-direction: column;

    &__content {
      margin-top: 20px;
      @include respond-to(md) {
        margin-top: 10px;
        width: 100%;
      }
    }
  }
`;

export default staticStyles;
