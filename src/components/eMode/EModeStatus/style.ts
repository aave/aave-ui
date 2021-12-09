import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .EModeStatus {
    position: relative;
    padding-left: 12px;
    @include respond-to(xl) {
      padding-left: 10px;
    }
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }
`;

export default staticStyles;
