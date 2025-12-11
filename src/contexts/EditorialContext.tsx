import React, { createContext, useContext, useState, ReactNode } from 'react';

export type EditorialType = 'news' | 'sports' | 'business' | 'entertainment' | 'tech' | 'politics';

interface EditorialContextType {
  currentEditorial: EditorialType;
  setEditorial: (editorial: EditorialType) => void;
  getEditorialClass: () => string;
  getEditorialLabel: () => string;
}

const editorialLabels: Record<EditorialType, string> = {
  news: 'Notícias',
  sports: 'Esportes',
  business: 'Negócios',
  entertainment: 'Entretenimento',
  tech: 'Tecnologia',
  politics: 'Política',
};

const EditorialContext = createContext<EditorialContextType | undefined>(undefined);

export function EditorialProvider({ children }: { children: ReactNode }) {
  const [currentEditorial, setCurrentEditorial] = useState<EditorialType>('news');

  const setEditorial = (editorial: EditorialType) => {
    setCurrentEditorial(editorial);
  };

  const getEditorialClass = () => `editorial-${currentEditorial}`;

  const getEditorialLabel = () => editorialLabels[currentEditorial];

  return (
    <EditorialContext.Provider value={{ currentEditorial, setEditorial, getEditorialClass, getEditorialLabel }}>
      <div className={getEditorialClass()}>
        {children}
      </div>
    </EditorialContext.Provider>
  );
}

export function useEditorial() {
  const context = useContext(EditorialContext);
  if (context === undefined) {
    throw new Error('useEditorial must be used within an EditorialProvider');
  }
  return context;
}
