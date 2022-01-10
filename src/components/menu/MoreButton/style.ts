import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MoreButton {
    .DropdownWrapper__contentVisible.DropdownWrapper__content {
      top: 100%;
    }
    &__button {
      font-size: $regular;
      position: relative;
      text-transform: uppercase;
      padding: 15px 0;
      display: flex;
      align-items: center;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      &:hover {
        span {
          opacity: 0;
        }
        strong {
          opacity: 1;
        }
      }
      span {
        font-weight: 300;
        transition: $transition;
        opacity: 1;
      }
      strong {
        transition: $transition;
        position: absolute;
        left: 0;
        opacity: 0;
      }
      i {
        display: block;
        position: relative;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        margin-left: 8px;
        &:nth-last-of-type(1),
        &:nth-last-of-type(2) {
          margin-left: 5px;
        }
      }
    }

    &__buttonActive {
      span {
        opacity: 0;
      }
      strong {
        opacity: 1;
      }
    }

    &__content {
      width: 180px;
    }

    &__links {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 50px;
        &:last-of-type {
          border-bottom: none;
        }
      }
      .MoreButton__linkHidden {
        display: none;
      }
    }

    &__link {
      font-weight: 300;
      text-transform: uppercase;
      font-size: $medium;
      padding: 18px 5px 15px;
      width: 100%;
      backface-visibility: hidden;
      transform: translateZ(0);
      min-height: 50px;
      * {
        backface-visibility: hidden;
        transform: translateZ(0);
      }
    }

    &__switcher-inner {
      margin-bottom: 20px;
      min-height: auto;
      border-bottom: none !important;
    }

    &__socialIcon {
      margin: 0 4px;
    }
  }
`;

export default staticStyles;
