import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ContentWrapperWithTopLine {
    box-shadow: $boxShadow;

    &__withDropdown {
      .ContentWrapperWithTopLine__top-line {
        cursor: pointer;
      }
      .ContentWrapperWithTopLine__content {
        display: none;
      }
      .ContentWrapperWithTopLine__contentActive {
        display: block;
      }
    }

    &__top-line {
      padding: 15px 20px;
      font-size: $regular;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      min-height: 49px;
      @include respond-to(xl) {
        padding: 10px 15px;
        font-size: $small;
        min-height: 34px;
      }
      @include respond-to(lg) {
        padding: 10px;
      }
      @include respond-to(md) {
        padding: 10px 15px;
      }
      @include respond-to(sm) {
        padding: 10px;
        font-size: $regular;
        min-height: 39px;
      }
    }

    &__arrow-inner {
      display: flex;
      align-items: center;
      font-size: $medium;
      span {
        margin-right: 5px;
      }
    }

    &__content {
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
`;

export default staticStyles;
