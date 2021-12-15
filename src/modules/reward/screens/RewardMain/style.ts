import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .RewardMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 450px;

    &__items {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      padding: 4px;
      margin: 4px;
      width: calc(50% - 8px);

      .TokenIcon {
        margin-bottom: 4px;
        .TokenIcon__image {
          margin: 0;
        }
      }

      .Value {
        align-items: center;
      }

      &--text {
        display: inline-flex;
        margin-top: 4px;
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $medium;
        }
      }
    }

    &__buttonInner {
      margin-top: 32px;
    }
  }
`;

export default staticStyles;
