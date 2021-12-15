import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReserveInformation {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    max-width: calc(100% - 555px);
    @include respond-to(xl) {
      margin-right: 20px;
      max-width: calc(100% - 460px);
    }
    @include respond-to(lg) {
      max-width: calc(100% - 360px);
    }
    @include respond-to(md) {
      display: block;
      margin: 0 0 10px 0;
      max-width: 100%;
    }
    @include respond-to(sm) {
      margin: 30px 0 0 0;
      display: block;
    }

    &__title {
      font-weight: 400;
      font-size: $large;
      margin-bottom: 10px;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &__content {
      padding: 20px;
      flex: 1;
      @include respond-to(xl) {
        padding: 10px;
      }
      @include respond-to(lg) {
        padding: 10px 5px;
      }
      @include respond-to(md) {
        padding: 20px 30px;
      }
      @include respond-to(sm) {
        padding: 20px 15px;
      }
    }

    &__top-info {
      .ReserveInformation__line {
        margin: 0;
        font-size: $extraSmall;
      }
    }

    &__graph-inner {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      @include respond-to(xl) {
        margin-bottom: 10px;
      }
      @include respond-to(md) {
        margin-bottom: 15px;
      }
      @include respond-to(sm) {
        flex-direction: column;
      }
    }

    &__middle-info {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      @include respond-to(md) {
        display: flex;
      }
      @include respond-to(sm) {
        flex-direction: column;
      }
    }

    &__line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
      border-radius: $borderRadius;
      margin: 0 15px;
      font-size: $regular;
      min-width: 260px;
      @include respond-to(xl) {
        min-width: 200px;
        font-size: $small;
      }
      @include respond-to(lg) {
        min-width: 150px;
        margin: 0 7px;
        font-size: $extraSmall;
        padding: 5px;
      }
      @include respond-to(md) {
        min-width: 200px;
        margin: 0 15px;
        font-size: $small;
        padding: 5px 10px;
      }
      @include respond-to(sm) {
        font-size: $regular;
        padding: 10px;
        min-width: unset;
        width: 100%;
        margin: 0 0 10px 0;
      }
      .BlockWrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0;
      }
      strong {
        margin-left: 5px;
        white-space: nowrap;
      }
      .TokenIcon__dollar,
      .Value .Value__value,
      .BlockWrapper__title-inner .TextWithModal__text,
      .BlockWrapper__title-inner p,
      .TextWithModal__text {
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }

    &__APY-info {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      @include respond-to(xl) {
        margin-bottom: 15px;
      }
      @include respond-to(lg) {
        margin-bottom: 5px;
      }
      @include respond-to(md) {
        margin-bottom: 10px;
      }
      @include respond-to(sm) {
        margin-bottom: 35px;
        flex-direction: column;
      }
    }

    &__bottom-info {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-around;
      max-width: 100%;
      margin: 0 auto;
      @include respond-to(xl) {
        max-width: 850px;
      }
      @include respond-to(lg) {
        max-width: 700px;
      }
      @include respond-to(md) {
        max-width: 100%;
      }

      .BlockWrapper {
        margin-top: 10px;
        @include respond-to(sm) {
          margin-top: 0;
        }
      }
    }

    &__bottomItems {
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
    }

    &__poolLink-inner {
      position: relative;
      font-size: $medium;
      display: flex;
      align-items: center;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        justify-content: flex-end;
        text-align: right;
      }
      @include respond-to(md) {
        justify-content: flex-start;
        text-align: left;
      }
      @include respond-to(sm) {
        display: none;
      }
      img {
        width: 12px;
        height: 12px;
        margin-left: 5px;
      }
    }
  }
`;

export default staticStyles;
