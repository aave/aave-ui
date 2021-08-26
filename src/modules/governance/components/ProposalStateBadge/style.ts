import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ProposalState {
    font-size: $regular;
    margin-right: 20px;
    display: flex;
    align-items: center;
    @include respond-to(xl) {
      font-size: $small;
      margin-right: 15px;
    }
    @include respond-to(xs) {
      margin-right: 10px;
    }

    &__circle {
      width: 16px;
      height: 16px;
      margin-right: 5px;
      border-radius: 50%;
      display: block;
      position: relative;
      bottom: 1px;
      @include respond-to(xl) {
        width: 10px;
        height: 10px;
        bottom: 0;
      }
    }
    span {
      text-transform: capitalize;
    }

    &__big {
      font-size: $large;
      margin-right: 0;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(sm) {
        font-size: $medium;
      }
      .ProposalState__circle {
        bottom: 0;
      }
    }
  }
`;

export default staticStyles;
