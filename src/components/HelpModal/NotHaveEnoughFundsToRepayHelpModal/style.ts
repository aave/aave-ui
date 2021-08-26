import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NotHaveEnoughFundsToRepayHelpModal {
    &__content {
      p {
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    .TextWithModal__text {
      margin-top: 2px;
      font-size: $small;
      text-align: left;
      max-width: 160px;
      @include respond-to(lg) {
        font-size: $extraSmall;
        max-width: 130px;
      }
    }
  }
`;

export default staticStyles;
