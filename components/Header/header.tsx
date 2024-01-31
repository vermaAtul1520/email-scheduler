import React, { useEffect } from 'react'
import style from './Header.module.css'
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { usePopupContext } from "@/context/popupcontext"

const Header = () => {
    const { openPopup } = usePopupContext();
    
    return (
        <div className={style.mainContainer}>
            <div className={style.searchBar}>
                <input className={style.searchInput} type="text" placeholder="Search" />
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