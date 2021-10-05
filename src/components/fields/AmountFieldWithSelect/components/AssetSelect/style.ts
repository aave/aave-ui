import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AssetSelect {
    width: 130px;
    margin-right: 10px;
    position: relative;
    z-index: 1;
    @include respond-to(lg) {
      width: 120px;
    }
    @include respond-to(md) {
      width: 130px;
    }

    &__active {
      z-index: 5;
    }

    &__reverse {
      margin-right: 0;
      margin-left: 10px;
      .AssetSelect__title {
        text-align: right;
      }
      .AssetSelect__apy {
        left: auto !important;
        right: 0;
      }
    }

    &__title {
      font-size: $medium;
      margin-bottom: 5px;
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    &__button {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      font-size: $regular;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      width: 100%;
      transition: none !important;
      position: relative;
      @include respond-to(lg) {
        font-size: $small;
        height: 40px;
      }
      @include respond-to(md) {
        font-size: $regular;
        height: 50px;
      }

      .TokenIcon {
        &__image {
          margin-right: 5px !important;
        }
        .TokenIcon__name {
          font-size: $regular !important;
          @include respond-to(lg) {
            font-size: $small !important;
          }
          @include respond-to(md) {
            font-size: $regular !important;
          }
          b {
            font-weight: 400 !important;
          }
        }
      }
      .MultipleIcons {
        margin-right: 5px !important;
        .TokenIcon__image {
          margin-right: 0 !important;
        }
      }
    }

    .DropdownWrapper__contentVisible {
      width: calc(100% + 10px);
      box-shadow: none !important;
      background: transparent !important;
      left: -5px !important;
      top: calc(100% + 5px) !important;
    }
    &__content {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 500px;
      padding: 0 5px;
      .CustomScroll {
        > div {
          &:first-of-type {
            margin-bottom: 0 !important;
          }
        }
      }
    }
    &__content-inner {
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
      transform: translateZ(0);
      flex: auto;
      height: 1px;
      min-height: 114px;
      max-height: 250px;
      box-shadow: $boxShadow;
      @include respond-to(xl) {
        min-height: 94px;
        max-height: 205px;
      }
      @include respond-to(md) {
        max-height: 230px;
      }
    }
    &__contentWithoutScroll {
      max-height: 100%;
      min-height: auto;
      height: auto;
      flex: none;
    }

    &__noData {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 10px 0;
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $small;
      }
    }

    .AssetSelect__search {
      input {
        padding: 15px 10px;
        font-size: $regular;
        @include respond-to(xl) {
          padding: 10px;
        }
        @include respond-to(lg) {
          font-size: $small;
        }
        @include respond-to(md) {
          font-size: $regular;
        }
      }
    }

    &__option {
      padding: 15px 10px;
      display: flex;
      align-items: center;
      width: 100%;
      @include respond-to(xl) {
        padding: 10px;
      }
      &:hover,
      &:disabled {
        border-bottom: 1px solid transparent !important;
      }

      .TokenIcon {
        .TokenIcon__name {
          b {
            font-weight: 400 !important;
          }
        }
      }
    }

    .AssetSelect__apy {
      display: flex;
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
      font-size: $small;
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        font-size: $small;
      }
      .ValuePercent .ValuePercent__value {
        font-size: $small;
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $small;
        }
      }
      .AssetSelect__apy-title {
        margin-right: 5px;
      }
    }
  }
`;

export default staticStyles;
