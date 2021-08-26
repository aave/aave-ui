import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NoDataGraph {
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include respond-to(xl) {
      height: 110px;
    }
    @include respond-to(lg) {
      height: 100px;
    }
    @include respond-to(md) {
      height: 140px;
    }
    p {
      font-size: $medium;
    }
  }
`;

export default staticStyles;
