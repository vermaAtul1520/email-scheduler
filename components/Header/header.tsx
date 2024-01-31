import React, { useEffect, useState ,useCallback} from 'react'
import style from './Header.module.css'
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { usePopupContext } from "@/context/popupcontext"

const Header = () => {
    const { openPopup,displaySearch } = usePopupContext();
    const [searchText, setSearchText] = useState('');

    const debounceFunction = (func: any, delay: any) => {
        let timer: any;
        return function () {
            let self = this;
            let args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(self, args);
            }, delay);
        };
    };

    const debounceSearch = useCallback(
        debounceFunction((val: any) => {
            displaySearch(val);
        }, 500),
        [],
    );

    const handleSearch = async (val: string) => {
        setSearchText(val);
        debounceSearch(val);
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.searchBar}>
                <input 
                onChange={(e)=>{
                    handleSearch(e.target.value);
                }}
                 className={style.searchInput} type="text" placeholder="Search" />
                <FaSearch />
            </div>
            <button className={style.button}
                onClick={() => openPopup()}>
                <div className={style.addButton}>
                    <CiCirclePlus
                        // width={20}
                        // height={40}
                        size={25}
                        fontWeight={300}
                    />
                    <span>Add</span>
                </div>
            </button>
        </div>
    )
}

export default Header