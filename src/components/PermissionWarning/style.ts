import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .PermissionWarning {
    margin-top: 110px !important;
    @include respond-to(xl) {
      margin-top: 98px !important;
    }
    @include respond-to(sm) {
      margin-top: 0 !important;
    }

    .Caption {
      .Caption__description {
        max-width: 400px;
        margin: 0 auto;
      }
    }
  }
`;

export default staticStyles;
