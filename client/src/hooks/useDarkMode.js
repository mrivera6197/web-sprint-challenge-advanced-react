import { useState } from 'react'

export const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState('dark-mode')

    return ([darkMode, setDarkMode])
}