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
        max-width: 240px;
        @include respond-to(lg) {
          max-width: 200px;
        }
        @include respond-to(sm) {
          max-width: 80px;
        }
      }
    }
  }
`;

export default staticStyles;
