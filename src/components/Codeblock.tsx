import React, {useState} from 'react'
import styles from '../styles/Code.module.sass'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {CopyOutlined} from '@ant-design/icons'

export default () => {
    const [copied, setCopied] = useState(false)

    return (
        <div className={styles.codeblock}>
            <CopyToClipboard text={repoText}
                             onCopy={() => {
                                 setCopied(true)
                                 setTimeout(() => setCopied(false), 1000)
                             }}>
                <button>
                    <CopyOutlined/>{' '}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </CopyToClipboard>
            <pre><code><span className={styles.section}>[Clansty]</span>{'\n'}
                <span className={styles.attr}>SigLevel</span> = Never{'\n'}
                <span className={styles.attr}>Server</span> = https://repo.lwqwq.com/archlinux/<span
                    className={styles.var}>$arch</span>
                <span className={styles.attr}>Server</span> = https://pacman.ltd/archlinux/<span
                    className={styles.var}>$arch</span>
        </code></pre>
        </div>
    )
}

const repoText = `[Clansty]
SigLevel = Never
Server = https://repo.lwqwq.com/archlinux/$arch
Server = https://pacman.ltd/archlinux/$arch`
