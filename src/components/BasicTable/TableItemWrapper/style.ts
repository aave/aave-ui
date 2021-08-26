import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableItemWrapper {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    transition-property: box-shadow;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    border: 1px solid transparent;
    font-size: $large;
    padding: 10px 30px;
    cursor: pointer;
    @include respond-to(xl) {
      font-size: $regular;
      padding: 9px 20px;
    }
    @include respond-to(lg) {
      padding: 5px 10px;
    }
    @include respond-to(md) {
      padding: 9px 10px;
    }
    @include respond-to(sm) {
      font-size: $small;
      padding: 5px 10px;
    }

    &.TableItemWrapper__disabled {
      cursor: default;
      border: 1px solid transparent;
      box-shadow: none;
      &:hover,
      &:active {
        border: 1px solid transparent;
        box-shadow: none;
      }
    }
  }
`;

export default staticStyles;
