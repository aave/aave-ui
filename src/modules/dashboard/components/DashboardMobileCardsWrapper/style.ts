import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardMobileCardsWrapper {
    padding: 0 10px;

    &__withTopMargin {
      margin-top: 50px;
    }

    &__title {
      text-align: center;
      margin-bottom: 10px;
      font-size: $regular;
    }
  }
`;

export default staticStyles;
