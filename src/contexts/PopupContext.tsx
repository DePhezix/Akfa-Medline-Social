import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type PopUpContextType = {
  isPopUpOpen: boolean,
  setIsPopUpOpen: Dispatch<SetStateAction<boolean>>
}

export const PopUpContext = createContext<PopUpContextType>({
  isPopUpOpen: false,
  setIsPopUpOpen: () => {},
});

type Props = {
  children: ReactNode
}

export function PopUpProvider({ children }: Props) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <PopUpContext.Provider value={{ isPopUpOpen, setIsPopUpOpen }}>
      {children}
    </PopUpContext.Provider>
  );
}
