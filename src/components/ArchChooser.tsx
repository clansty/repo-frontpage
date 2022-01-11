import React, {useEffect, useRef} from 'react'
import styles from '../styles/ArchChooser.module.sass'

export default ({arch, setArch}: any) => {
    const x8664Ref = useRef()
    const shadowRef = useRef()

    useEffect(() => {
        shadowRef.current.style.transform =
            `translateX(${x8664Ref.current.offsetLeft + 2}px) translateY(${x8664Ref.current.offsetTop + 2}px)`
        shadowRef.current.style.height = `${x8664Ref.current.clientHeight - 4}px`
        shadowRef.current.style.width = `${x8664Ref.current.clientWidth - 4}px`
        setTimeout(() => shadowRef.current.style.transition = 'all 0.3s ease-in-out', 0)
    }, [])

    return <div className={styles.archChooser}>
        <div className={`${styles.textContainer} ${arch === 'x86_64' && styles.selected}`} ref={x8664Ref}
             onClick={e => handleClick(e, 'x86_64')}>
            x86_64
        </div>
        {['i686', 'aarch64', 'loongarch64'].map(a => (
            <div className={`${styles.textContainer} ${arch === a && styles.selected}`}
                 onClick={e => handleClick(e, a)} key={a}>
                {a}
            </div>))}
        <div className={styles.shadow} ref={shadowRef}/>
    </div>

    function handleClick(e, arch) {
        setArch(arch)
        shadowRef.current.style.transform =
            `translateX(${e.currentTarget.offsetLeft + 2}px) translateY(${e.currentTarget.offsetTop + 2}px)`
        shadowRef.current.style.height = `${e.currentTarget.clientHeight - 4}px`
        shadowRef.current.style.width = `${e.currentTarget.clientWidth - 4}px`
    }
}
