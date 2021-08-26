import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Pagination {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    padding-bottom: 10px;
    @include respond-to(xl) {
      margin-top: 30px;
    }
    @include respond-to(lg) {
      margin-top: 20px;
    }

    &__button {
      position: relative;
      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      &:first-of-type {
        margin-right: 50px;
        top: -1px;
      }
    }
  }
`;

export default staticStyles;
