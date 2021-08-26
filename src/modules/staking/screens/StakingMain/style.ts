import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .StakingMain {
    padding-bottom: 50px;
    @include respond-to(sm) {
      padding-bottom: 0;
    }
    &__caption-inner {
      max-width: 460px;
      text-align: center;
      margin: 0 auto 40px;
      @include respond-to(xl) {
        margin: 0 auto 30px;
        max-width: 415px;
      }
      @include respond-to(lg) {
        max-width: 300px;
      }
    }

    &__description {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    &__buttons {
      display: flex;
      align-items: center;
      justify-content: center;

      .StakingMain__button {
        border-radius: $borderRadius;
        box-shadow: $boxShadow;
        margin: 0 25px;
        position: relative;
        &:hover {
          &:after {
            opacity: 1;
          }
        }
        &:active {
          img {
            transform: scale(0.9);
          }
        }
        @include respond-to(lg) {
          margin: 0 20px;
        }
        @include respond-to(sm) {
          margin: 0 15px;
        }
        &:after {
          content: '';
          position: absolute;
          left: -1px;
          right: -1px;
          top: -1px;
          bottom: -1px;
          filter: blur(3px);
          opacity: 0;
          transition: all 0.3s ease;
        }

        img {
          width: 60px;
          height: 60px;
          margin-bottom: 15px;
          transition: all 0.3s ease;
          @include respond-to(xl) {
            width: 40px;
            height: 40px;
            margin-bottom: 10px;
          }
        }

        p {
          font-size: $large;
          text-align: center;
          height: 50px;
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          @include respond-to(xl) {
            font-size: $medium;
            height: 40px;
          }
          strong {
            margin-left: 5px;
            @include respond-to(xl) {
              margin-left: 3px;
            }
          }
        }
      }

      .StakingMain__buttonDisabled {
        opacity: 1 !important;
        cursor: not-allowed;
        box-shadow: none;
        &:after {
          display: none;
        }
        img {
          transform: scale(1) !important;
        }
        p,
        img {
          opacity: 0.2;
        }
      }

      .StakingMain__button-inner {
        position: relative;
        z-index: 2;
        width: 160px;
        height: 160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        @include respond-to(xl) {
          width: 120px;
          height: 120px;
        }
      }
    }

    .InfoWrapper {
      width: 680px;
      @include respond-to(xl) {
        width: 530px;
      }
      @include respond-to(lg) {
        width: 420px;
      }
      @include respond-to(md) {
        width: 360px;
      }
      @include respond-to(sm) {
        width: 90%;
        margin: 20px auto 0;
      }
    }
    .StakingMain__info {
      position: relative;
      padding-right: 20px;
      a {
        font-weight: 600;
      }
      .StakingMain__info-link {
        position: absolute;
        right: 0;
        top: 0;
        @include respond-to(sm) {
          top: auto;
          bottom: 0;
        }
        &:hover {
          opacity: 0.7;
        }
        &:active {
          transform: scale(0.9);
        }

        img {
          width: 16px;
          height: 16px;
          @include respond-to(xl) {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
`;

export default staticStyles;
