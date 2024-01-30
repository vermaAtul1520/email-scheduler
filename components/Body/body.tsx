import React from 'react'
import Table from '../Table/table'
import Header from '../Header/header'
import styles from "./Body.module.css";

const body = () => {
  return (
    <div className={styles.mainContainer}>
        <Header/>
        <Table/>
    </div>
  )
}

export default body