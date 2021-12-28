import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardIsolatedBadge {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @include respond-to(sm) {
      align-items: flex-end;
    }

    .IsolatedBadge {
      border: unset !important;
      padding: unset !important;
      margin: 8px 0 0 0 !important;

      .IsolatedBadge__text {
        font-weight: 400;
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
      }
    }
  }
`;

export default staticStyles;
