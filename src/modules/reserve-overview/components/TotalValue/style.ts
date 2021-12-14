import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TotalValue {
    display: flex;
    min-width: 350px;
    @include respond-to(xl) {
      min-width: 300px;
    }
    @include respond-to(lg) {
      min-width: 190px;
    }
    @include respond-to(md) {
      min-width: 200px;
    }
    @include respond-to(sm) {
      min-width: 100%;
      order: 1;
      margin-bottom: 30px;
    }

    &__green {
      justify-content: flex-start;
      @include respond-to(sm) {
        justify-content: center;
      }
      .Value {
        align-items: flex-start;
        @include respond-to(sm) {
          align-items: center;
        }
      }
      .TotalValue__caps {
        align-items: flex-start;
        @include respond-to(sm) {
          align-items: center;
        }
        .CapsHelpModal {
          justify-content: flex-start;
          @include respond-to(sm) {
            justify-content: center;
          }
        }
      }
    }
    &__red {
      justify-content: flex-end;
      @include respond-to(sm) {
        justify-content: center;
      }
      .TotalValue__inner {
        align-items: flex-end;
      }
      .TotalValue__title {
        flex-direction: row-reverse;
        @include respond-to(sm) {
          flex-direction: row;
        }
        i {
          margin-left: 0 !important;
          margin-right: 5px;
          @include respond-to(xl) {
            margin-right: 3px;
          }
          @include respond-to(sm) {
            margin-right: 0;
            margin-left: 5px !important;
          }
        }
      }
      .Value {
        align-items: flex-end;
        @include respond-to(sm) {
          align-items: center;
        }
      }
      .TotalValue__caps {
        align-items: flex-end;
        @include respond-to(sm) {
          align-items: center;
        }
        &:after {
          left: auto;
          right: 0;
        }

        .CapsHelpModal {
          justify-content: flex-end;
          @include respond-to(sm) {
            justify-content: center;
          }
        }
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      @include respond-to(sm) {
        justify-content: center !important;
        align-items: center !important;
      }
    }

    .TotalValue__title {
      font-size: $regular;
      display: flex;
      align-items: center;
      font-weight: 300;
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
        font-weight: 400;
      }
      i {
        display: block;
        width: 10px;
        height: 10px;
        margin-left: 5px;
        @include respond-to(xl) {
          width: 8px;
          height: 8px;
          margin-left: 3px;
        }
        @include respond-to(lg) {
          width: 6px;
          height: 6px;
        }
        @include respond-to(md) {
          width: 8px;
          height: 8px;
        }
        @include respond-to(sm) {
          margin-left: 5px;
        }
      }
    }

    .Value .Value__value {
      position: relative;
      margin: 5px 0;
      font-size: 30px;
      @include respond-to(xl) {
        font-size: 20px;
      }
      @include respond-to(lg) {
        font-size: $medium;
        margin: 4px 0;
      }
      @include respond-to(md) {
        font-size: 20px;
        margin: 5px 0;
      }
      @include respond-to(sm) {
        font-size: 30px;
      }
    }

    .Value .SubValue {
      font-size: $medium;
      white-space: nowrap;
      font-weight: 400;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(sm) {
        font-size: $medium;
      }
    }

    &__caps {
      position: relative;
      padding-top: 10px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        opacity: 0.2;
        width: 40px;
        height: 1px;
        left: 0;
        @include respond-to(sm) {
          right: auto !important;
          left: 50% !important;
          transform: translateX(-50%);
        }
      }

      .TextWithModal {
        align-items: center;
      }

      .TextWithModal__text {
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
        @include respond-to(sm) {
          font-size: $medium;
        }
      }

      .TextWithModal__button {
        position: static;
        transform: unset;
        margin-left: 4px;
      }

      .Value .Value__value {
        margin: 4px 0;
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          margin: 2px 0;
        }
        @include respond-to(sm) {
          font-size: $medium;
          margin: 4px 0;
        }
      }
      .Value .SubValue,
      .TotalValue__noLimits {
        font-size: $small;
        @include respond-to(xl) {
          font-size: $extraSmall;
        }
        @include respond-to(sm) {
          font-size: $small;
        }
      }

      .TotalValue__noLimits {
        margin-top: 4px;
        @include respond-to(lg) {
          margin-top: 2px;
        }
        @include respond-to(sm) {
          margin-top: 4px;
        }
      }
    }
  }
`;

export default staticStyles;
