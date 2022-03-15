import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.sass'
import Codeblock from '../components/Codeblock'
import PackageList from '../components/PackageList'
import {Outlet, useLocation} from 'react-router-dom'
import BuildInfo from '../types/BuildInfo'
import axios from 'axios'
import BuildInfoContext from '../contexts/BuildInfoContext'
import pako from 'pako'

export default () => {
    const [buildInfo, setBuildInfo] = useState<BuildInfo>(undefined)
    useEffect(() => {
        axios.get('https://archlinux.blob.core.windows.net/repo/build-info.json.gz', {
            responseType: 'arraybuffer',
        }).then(res => {
            const data = pako.inflate(res.data, {to: 'string'})
            setBuildInfo(JSON.parse(data))
        })
    }, [])

    const location = useLocation()

    return (
        <div className={`container ${location.pathname !== '/' && 'detailOpen'}`}>
            <BuildInfoContext.Provider value={buildInfo}>
                <div className={styles.home + ' home'}>
                    <h1>
                        <a href="https://clansty.com" style={{color: 'unset'}}>Clansty</a>
                        's Archlinux Repository
                    </h1>
                    <p>
                        Welcome to my personal Repository for{' '}
                        <a href="https://archlinux.org/">Arch Linux</a>. Here I provide some
                        packages that is not provided by official or{' '}
                        <a href="https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/">
                            ArchLinuxCN
                        </a>{' '}
                        repositories. These packages are built from{' '}
                        <a href="https://aur.archlinux.org/">AUR</a> with{' '}
                        <a href="https://github.com/Clansty/arch-build">GitHub Actions</a> or
                        collected somewhere else.
                    </p>
                    <p>
                        This repository support 4 architectures: <b>x86_64</b>, <b>i686</b>, {' '}
                        <b>aarch64</b> and <b>loongarch64</b>
                    </p>
                    <p>
                        To use this repository, add these lines to your{' '}
                        <code>/etc/pacman.conf</code>:
                    </p>
                    <Codeblock/>
                    <p>
                        For{' '}
                        <a href="https://archlinux32.org/">Arch Linux 32</a>{' '}
                        users, you may set <code>Architecture = pentium4 i686</code> in{' '}
                        <code>/etc/pacman.conf</code>, or pacman will refuse to install packages marked as{' '}
                        <code>i686</code>, but these packages are compatible with your system.
                    </p>
                    <p>
                        Note that the environment of <a className="manjaro" href="https://manjaro.org/">Manjaro</a> is
                        slightly different from Arch Linux, this repository may not completely work on <span
                        className="manjaro">Manjaro</span>.
                    </p>
                    <p>
                        You can take a brief look at the packages in the repository below.
                    </p>
                    <PackageList/>
                </div>
                <Outlet/>
            </BuildInfoContext.Provider>
        </div>
    )
};
