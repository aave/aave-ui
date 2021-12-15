import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BorrowPowerUsedLine {
    display: flex;
    flex-direction: column;

    &__lineWrapper {
      width: 100%;
      border-radius: 50px;
      margin-bottom: 6px;
      position: relative;
      height: 3px;
    }

    &__line {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 4px;
      border-radius: 50px;
      background: linear-gradient(270deg, #e255c1 0.48%, #b6509e 100%);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
    }

    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__title,
    .ValuePercent__value {
      font-size: $small;
      font-weight: 400;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
    }
  }
`;

export default staticStyles;
