import { createContext, useContext, ReactNode, useState } from "react";

// Define the context type
interface PopupContextType {
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  togglePopup: () => void;
  popupData: object;
  setpopup: (data: {}) => void;
  getData: ()=> void;
  data:[];
  displaySearch: ()=>{}
}

interface popupData {
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string;
  time: string;
}
// Create and export the context
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Create a hook for using the context
export const usePopupContext = (): PopupContextType => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopupContext must be used within a PopupProvider");
  }
  return context;
};

// Create the PopupProvider component
interface PopupProviderProps {
  children: ReactNode;
}
interface popupData {
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string;
  time: string;
}

const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [data, setData] = useState <[]>([]);
  const [popupData, setPopupData] = useState<popupData>({});

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setpopup({});
  };

  const togglePopup = () => {
    setIsPopupOpen((prevIsPopupOpen: any) => !prevIsPopupOpen);
  };

  const setpopup = (data: {}) => {
    setPopupData(data);
  };

  async function getData() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/schedule`, {
      method: "GET", // Specify the request method
      headers: {
        "Content-Type": "application/json",
      },
    });

    setData(await data.json());
  }

  async function displaySearch(val:string) {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/schedule?title=${val}`, {
      method: "GET", // Specify the request method
      headers: {
        "Content-Type": "application/json",
      },
    });

    setData(await data.json());
  }

  const contextValue: PopupContextType = {
    isPopupOpen,
    openPopup,
    closePopup,
    togglePopup,
    popupData,
    setpopup,
    getData,
    data,
    displaySearch
  };

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;
