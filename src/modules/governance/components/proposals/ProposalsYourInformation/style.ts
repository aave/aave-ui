import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ProposalsYourInformation {
    margin-bottom: 20px;
    @include respond-to(xl) {
      margin-bottom: 10px;
    }
    @include respond-to(sm) {
      margin-bottom: 20px;
    }

    &__top-wrapper {
      .Row {
        padding: 20px 15px;
        @include respond-to(xl) {
          padding: 15px;
        }
        @include respond-to(sm) {
          padding: 20px 10px;
        }
        .Row__title {
          @include respond-to(xl) {
            font-size: $small;
          }
          @include respond-to(sm) {
            font-size: $regular;
          }
        }
        .Row__subtitle {
          opacity: 0.5;
          @include respond-to(sm) {
            font-size: $small !important;
          }
        }
        &:nth-of-type(2) {
          padding-top: 0;
        }
        &:last-of-type {
          align-items: center;
          @include respond-to(sm) {
            padding: 15px 10px;
          }

          .DefaultButton {
            width: 120px;
            font-size: $medium;
            @include respond-to(xl) {
              font-size: $extraSmall;
              width: 80px;
              min-height: 26px;
            }
            @include respond-to(sm) {
              width: 120px;
              min-height: 32px;
              font-size: $small;
            }
          }
          .TextWithModal__text {
            @include respond-to(xl) {
              font-size: $small;
            }
            @include respond-to(sm) {
              font-size: $regular;
            }
          }
        }
        .Preloader {
          align-items: flex-end;
        }
      }

      .VoteBalance {
        @include respond-to(sm) {
          font-size: $extraLarge;
        }
      }
    }

    &__delegated-items {
      padding: 0 15px 20px;
      @include respond-to(xl) {
        padding: 0 15px 10px;
      }
      @include respond-to(sm) {
        padding: 0 10px 20px;
      }
    }
    &__delegated-items__title {
      font-size: $large;
      margin-bottom: 5px;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
    }
    &__delegated-addresses {
      display: flex;
      justify-content: space-between;
      width: calc(100% + 10px);
      position: relative;
      left: -5px;
    }
    &__delegated-address {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      flex: 1;
      margin: 5px;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      font-size: $regular;
      padding: 10px 5px;
      transition: none;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
      .TokenIcon {
        margin-bottom: 8px;
        .TokenIcon__name {
          font-size: $regular;
          margin-bottom: 0;
          @include respond-to(xl) {
            font-size: $small;
          }
          @include respond-to(sm) {
            font-size: $regular;
          }

          b {
            font-weight: 400 !important;
          }
        }
      }
      p {
        margin-bottom: 2px;
      }
      strong {
        transition: $transition;
      }
    }
    &__linkIcon {
      position: absolute;
      right: 5px;
      top: 5px;
      width: 10px;
      height: 10px;
    }

    .ProposalsYourInformation__noWallet {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 20px 15px;
      font-size: $large;
      @include respond-to(xl) {
        padding: 15px;
        font-size: $small;
      }
      @include respond-to(sm) {
        padding: 20px 10px;
        font-size: $medium;
      }

      p {
        flex: 1;
        margin-right: 20px;
      }
    }
  }
`;

export default staticStyles;
