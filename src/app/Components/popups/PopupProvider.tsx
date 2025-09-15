"use client";
import React, { createContext, useContext, useState } from 'react';
import CallPopup from './CallPopup';
import FormPopup from './FormPopup';

interface PopupContextType {
  openCallPopup: () => void;
  openFormPopup: (type: 'contact' | 'testdrive') => void;
  closePopups: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

interface PopupProviderProps {
  children: React.ReactNode;
}

export const PopupProvider = ({ children }: PopupProviderProps) => {
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
  const [formType, setFormType] = useState<'contact' | 'testdrive'>('contact');

  const openCallPopup = () => {
    setIsCallPopupOpen(true);
    setIsFormPopupOpen(false);
  };

  const openFormPopup = (type: 'contact' | 'testdrive') => {
    setFormType(type);
    setIsFormPopupOpen(true);
    setIsCallPopupOpen(false);
  };

  const closePopups = () => {
    setIsCallPopupOpen(false);
    setIsFormPopupOpen(false);
  };

  return (
  <PopupContext.Provider value={{ openCallPopup, openFormPopup, closePopups }}>
      {children}
  <CallPopup isOpen={isCallPopupOpen} onClose={closePopups} />
  <FormPopup isOpen={isFormPopupOpen} onClose={closePopups} type={formType} />
    </PopupContext.Provider>
  );
};