import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardLeftTopLine {
    &__title {
      display: inline;
      color: white;
    }

    &__toggleActive {
      margin: 0 20px;
      display: inline;
      color: pink;
      cursor: pointer;
    }
    &__toggleDisabled {
      margin: 0 20px;
      display: inline;
      color: white;
      cursor: pointer;
    }
    &__toggleSwitch {
      display: inline;
      cursor: pointer;
    }
  }
`;

export default staticStyles;
