import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TailArrow {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 11px;
    height: 11px;
    border-width: 2px 2px 0 0;
    border-style: solid;
    transition: all 0.2s ease;
    &:after,
    &:before {
      content: '';
      right: 0;
      top: -2px;
      position: absolute;
      height: 2px;
      background: inherit;
      transform: rotate(-45deg) translateY(-10%);
      width: 18px;
      transform-origin: right top;
      transition: all 0.2s ease;
    }

    &__left {
      transform: rotate(45deg);
    }
    &__right {
      transform: rotate(-135deg);
    }
  }
`;

export default staticStyles;
