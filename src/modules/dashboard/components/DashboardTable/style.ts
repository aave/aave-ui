import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardTable {
    display: block;

    &__content {
      display: block;
      width: 100%;
    }
  }
`;

export default staticStyles;
