import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ValuePercent {
    display: flex;
    flex-direction: row;
    align-items: center;

    &__value {
      font-weight: 600;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }
      span {
        font-weight: 400;
        margin-left: 3px;
      }
    }
  }
`;

export default staticStyles;
