import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ProposalsItemBar {
    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
      .Value .Value__value {
        font-size: $regular;
        font-weight: 400;
        @include respond-to(xl) {
          font-size: $small;
        }
      }
    }

    &__item-leftInner {
      display: flex;
      min-width: 45px;
      justify-content: space-between;
      margin-right: 10px;
      @include respond-to(xl) {
        min-width: 30px;
      }
      .ProposalsItemBar__item-title {
        text-transform: uppercase;
      }
    }

    &__item-rightInner {
      min-width: 85px;
      margin-left: 10px;
      @include respond-to(xl) {
        min-width: 60px;
      }
    }
  }
`;

export default staticStyles;
