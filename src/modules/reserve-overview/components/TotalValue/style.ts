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
      .Value .Value__value {
        &:after {
          left: 0;
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
      .Value .Value__value {
        &:after {
          right: 0;
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
      margin-bottom: 6px;
      padding-bottom: 6px;
      font-size: 30px;
      @include respond-to(xl) {
        font-size: 20px;
      }
      @include respond-to(lg) {
        font-size: $medium;
        margin-bottom: 4px;
        padding-bottom: 4px;
      }
      @include respond-to(md) {
        font-size: 20px;
        margin-bottom: 6px;
        padding-bottom: 6px;
      }
      @include respond-to(sm) {
        font-size: 30px;
      }
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        opacity: 0.2;
        width: 40px;
        height: 1px;
        @include respond-to(sm) {
          right: auto !important;
          left: 50% !important;
          transform: translateX(-50%);
        }
      }
    }

    .Value .SubValue {
      font-size: $regular;
      font-weight: 300;
      white-space: nowrap;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: $medium;
        font-weight: 400;
      }
    }
  }
`;

export default staticStyles;
