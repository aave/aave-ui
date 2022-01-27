import React from 'react';
import classNames from 'classnames';
import aurora from '../../images/aurora-footer.png';
import LangSwitcher from '../basic/LangSwitcher';
import staticStyles from './style';

interface FooterProps {
  inside?: boolean;
}

const Aurora = () => (
  <div className="aurora_footer_container">
    <p className="aurora_footer_title">powered by</p>
    <img src={aurora} alt="" />
  </div>
);

const Indicator = () => (
  <div className="indicator_shadow">
    <div className="indicator"></div>
  </div>
);

const StatBox = ({
  value,
  description,
  time,
  i,
}: {
  value: string;
  description: string;
  time?: number;
  i?: boolean;
}) => {
  return (
    <div className="statbox">
      <div className="stats">
        {i && <Indicator />}
        <p className="statbox__value">{value}</p>
      </div>

      <div className="statbox__description-wrapper">
        <p className="statbox__description">{description}</p>
        {time && <span className="statbox__time-ago">{time} mins ago</span>}
      </div>
    </div>
  );
};

export default function Footer({ inside }: FooterProps) {
  return (
    <div className="footer_wrapper">
      <Aurora />
      <footer className={classNames('Footer', { Footer__inside: inside })}>
        <div className="stats">
          <StatBox description="added in platform fees" value="$ 245.13" time={12} />
          <StatBox description="added in platform fees" value="$ 546.31" time={16} />
          <StatBox description="added in platform fees" value="$ 1343.76" time={18} />
        </div>
        <div className="stats">
          <StatBox description="Market Size" value="902.70M" />
          <StatBox description="RADIANT" value="$0.24" />
          <StatBox description="Block Height" value="28 750 055" i />
          <div className="line_vert"></div>
          <LangSwitcher />
        </div>

        <style jsx={true} global={true}>
          {staticStyles}
        </style>
      </footer>
    </div>
  );
}
