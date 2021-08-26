import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardWrapper {
    &__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      @include respond-to(sm) {
        position: relative;
        left: -10px;
        width: calc(100% + 20px);
      }
    }

    .ScreenWrapper__mobile-bottomBorder {
      display: none !important;
      @include respond-to(md) {
        display: block !important;
      }
    }
  }
`;

export default staticStyles;
