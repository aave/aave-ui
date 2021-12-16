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
      align-items: center;
      justify-content: space-between;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      width: 100%;
      max-width: 400px;
      height: 60px;
      padding: 5px 20px;
      margin-bottom: 10px;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }

      .TokenIcon {
        .TokenIcon__image {
          margin-right: 4px;
        }
      }

      .Value {
        align-items: flex-start;
      }

      &--content {
        .Value__line {
          &:first-of-type {
            display: none;
          }
        }
      }

      &--leftTitle {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &--text {
        font-weight: 500;
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $medium;
        }
        @include respond-to(lg) {
          font-size: $small;
        }
        @include respond-to(md) {
          font-size: $medium;
        }
      }
    }

    &__arrow {
      display: inline-block;
      padding: 4px;
      transform: rotate(-45deg);
      position: relative;
      bottom: 1px;
      margin-left: 4px;
    }
  }
`;

export default staticStyles;
