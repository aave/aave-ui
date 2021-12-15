import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableHeaderWrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .TableColumn {
      &:first-of-type {
        align-items: flex-start;
        max-width: 260px;
        min-width: 260px;
        @include respond-to(lg) {
          max-width: 230px;
          min-width: 230px;
        }
        @include respond-to(md) {
          min-width: unset;
        }
        @include respond-to(sm) {
          max-width: 80px;
        }
      }
    }
  }
`;

export default staticStyles;
