/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TooltipController as Tooltip } from 'components/TooltipController'
import React, { useState } from 'react'
import styles from './styles.module.css'

function App() {
  const [isDarkOpen, setIsDarkOpen] = useState(false)

  return (
    <main className={styles['main']}>
      <button data-tooltip-id="button" data-tooltip-content="My big tooltip content 1">
        My button
      </button>
      <Tooltip
        id="button"
        place="top-start"
        positionStrategy="fixed"
        isOpen={isDarkOpen}
        setIsOpen={setIsDarkOpen}
      />
    </main>
  )
}

export default App
