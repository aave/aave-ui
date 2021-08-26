import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BorrowInterestRateForm {
    max-width: 620px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    @include respond-to(xl) {
      max-width: 520px;
    }
    @include respond-to(lg) {
      max-width: 420px;
    }
    @include respond-to(md) {
      max-width: 520px;
    }

    &__buttons {
      display: flex;
      align-items: flex-start;
    }

    .InfoPanel {
      margin-top: 20px;
    }

    &__button-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
    }
  }
`;

export default staticStyles;
