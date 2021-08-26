import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .VotingInformation {
    margin-bottom: 20px;
    @include respond-to(xl) {
      margin-bottom: 10px;
    }
    @include respond-to(sm) {
      margin-bottom: 20px;
    }

    .Preloader {
      min-height: auto;
    }

    .ContentWrapperWithTopLine__content {
      padding: 20px 15px;
      @include respond-to(xl) {
        padding: 15px;
      }
      @include respond-to(lg) {
        padding: 15px 10px;
      }
      @include respond-to(md) {
        padding: 15px;
      }
      @include respond-to(sm) {
        padding: 20px 15px;
      }
    }

    &__noInner {
      text-align: center;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(sm) {
        font-size: $medium;
      }
    }

    .VotingInformation__buttons {
      display: flex;
      justify-content: space-between;
      @include respond-to(sm) {
        justify-content: center;
      }
      a {
        @include respond-to(sm) {
          margin-right: 30px;
          &:last-of-type {
            margin-right: 0;
          }
        }
      }

      .DefaultButton {
        width: 170px;
        font-size: $medium;
        @include respond-to(xl) {
          min-height: 30px;
          width: 115px;
          font-size: $extraSmall;
        }
        @include respond-to(sm) {
          width: 120px;
          min-height: 32px;
          font-size: $small;
        }
      }
    }

    &__voted {
      .Row__title {
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
      }
      .Row__subtitle {
        opacity: 0.5;
        @include respond-to(sm) {
          font-size: $small !important;
        }
      }
    }
    &__voted-top {
      margin-bottom: 15px;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $small;
        margin-bottom: 10px;
      }
      @include respond-to(sm) {
        font-size: $medium;
        margin-bottom: 15px;
      }
      p {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          box-shadow: $boxShadow;
          border-radius: $borderRadius;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 30px;
          font-size: $medium;
          @include respond-to(xl) {
            width: 40px;
            height: 20px;
            font-size: $extraSmall;
          }
          @include respond-to(sm) {
            width: 60px;
            height: 30px;
            font-size: $medium;
          }
        }
      }
    }

    &__noWallet {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(sm) {
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
