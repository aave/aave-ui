import React, { ReactNode, useContext, useState } from 'react';

import goToTop from '../helpers/goToTop';

interface MenuContextProps {
  mobileMenuVisible: boolean;
  setMobileMenuVisible: (value: boolean) => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const MenuContext = React.createContext({} as MenuContextProps);

interface MenuProviderProps {
  children: ReactNode;
}

export function MenuProvider({ children }: MenuProviderProps) {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const openMobileMenu = () => {
    setMobileMenuVisible(true);
    goToTop('MobileMenuContent');
  };
  const closeMobileMenu = () => {
    setMobileMenuVisible(false);
    goToTop('MobileMenuContent');
  };

  if (mobileMenuVisible) {
    document.body.classList.add('Body__mobileMenu-open');
  } else {
    document.body.classList.remove('Body__mobileMenu-open');
  }

  return (
    <MenuContext.Provider
      value={{
        mobileMenuVisible,
        setMobileMenuVisible,
        openMobileMenu,
        closeMobileMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export const useMenuContext = () => useContext(MenuContext);
