import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .IncentivesCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .IncentivesCard__noData {
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        font-size: $small;
      }
    }

    &__left {
      @include respond-to(sm) {
        align-items: flex-start;
      }
    }
    &__right {
      @include respond-to(sm) {
        align-items: flex-end;
      }
    }
  }
`;

export default staticStyles;
