import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CheckBoxField {
    position: relative;

    input[type='checkbox'] {
      width: auto;
      display: none;
      opacity: 1 !important;
    }

    label {
      cursor: pointer;
      font-size: $regular;
      position: relative;
      font-weight: 300;
      display: flex;
      align-items: center;
      justify-content: center;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }

    p {
      margin: 0 0 0 10px;
      transition: $transition;
    }

    input:disabled + label {
      cursor: default !important;
      opacity: 1 !important;
    }

    &__label {
      margin: auto;
      user-select: none;
      cursor: pointer;
    }

    span {
      display: inline-block;
      vertical-align: middle;
      transform: translate3d(0, 0, 0);
      position: relative;
      &:first-child {
        width: 18px;
        height: 18px;
        transform: scale(1);
        transition: all 0.2s ease;
        border-radius: 1px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          position: absolute;
          width: 14px;
          height: 11px;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 16px;
          stroke-dashoffset: 16px;
          transition: all 0.3s ease;
          transition-delay: 0.1s;
          transform: translate3d(0, 0, 0);
        }

        i {
          display: block;
          font-style: normal;
          border-width: 2px;
          border-style: solid;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          opacity: 0;
        }
      }

      &:last-child {
        padding-left: 8px;
      }
    }

    input:checked + .CheckBoxField__label span:first-child svg {
      stroke-dashoffset: 0;
    }

    input:checked + .CheckBoxField__label span:first-child i {
      opacity: 1;
    }
  }
`;

export default staticStyles;
