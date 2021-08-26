import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CircleBackButton {
    transition: $transition;
    &:hover {
      opacity: 0.7;
    }
    &:active {
      transform: scale(0.9);
    }
  }

  .CircleBackButton,
  .CircleBackButton img {
    width: 30px;
    height: 30px;
    @include respond-to(xl) {
      width: 20px;
      height: 20px;
    }
  }
`;

export default staticStyles;
