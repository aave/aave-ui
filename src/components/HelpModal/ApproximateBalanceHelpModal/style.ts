import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ApproximateBalanceHelpModal {
    &__content {
      p {
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export default staticStyles;
