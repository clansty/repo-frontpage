import React, {useContext, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import BuildInfoContext from '../contexts/BuildInfoContext'
import styles from '../styles/Package.module.sass'
import {CloseOutlined, DownloadOutlined} from '@ant-design/icons'
import {Package} from '../types/BuildInfo'
import hSize from '../utils/hSize'

export default () => {
    const params = useParams()
    const buildInfo = useContext(BuildInfoContext)
    const [animateWidth, setAnimateWidth] = React.useState(styles.noWidth)

    useEffect(() => {
        setAnimateWidth('')
    }, [])

    if (!buildInfo) {
        return (
            <div className={styles.package}>
                <CloseButton/>
            </div>
        )
    }

    if (!buildInfo.packages[params.arch] || !buildInfo.packages[params.arch].find(e => e.name === params.package)) {
        return (<div className={styles.package}>
            <CloseButton/>
            <h1>{params.package}</h1>
            <p>Not Found</p>
        </div>)
    }

    const packageInfo = buildInfo.packages[params.arch].find(e => e.name === params.package) as Package
    return (
        <div className={`${styles.package} ${animateWidth}`}>
            <CloseButton/>
            <h1>{params.package}</h1>
            <p>{packageInfo.desc}</p>
            <p>
                <a href={`/archlinux/pool/${packageInfo.filename}`}>
                    <DownloadOutlined/> Download Package
                </a>
            </p>
            <table>
                <tbody>
                <tr>
                    <td>
                        Version:
                    </td>
                    <td>
                        {packageInfo.version}
                    </td>
                </tr>
                {packageInfo.url && <tr>
                    <td>
                        Upstream:
                    </td>
                    <td>
                        <a href={packageInfo.url}>{packageInfo.url}</a>
                    </td>
                </tr>}
                {packageInfo.isAur && <tr>
                    <td>
                        Source:
                    </td>
                    <td>
                        <a href={`https://aur.archlinux.org/packages/${packageInfo.name}/`}>AUR</a>
                    </td>
                </tr>}
                <tr>
                    <td>
                        Package size:
                    </td>
                    <td>
                        {hSize(Number(packageInfo.csize))}
                    </td>
                </tr>
                <tr>
                    <td>
                        Install size:
                    </td>
                    <td>
                        {hSize(Number(packageInfo.isize))}
                    </td>
                </tr>
                {packageInfo.provides.length > 0 && <tr>
                    <td>
                        Provides:
                    </td>
                    <td>
                        <ul>
                            {packageInfo.provides.map(e => <li key={e}>{e}</li>)}
                        </ul>
                    </td>
                </tr>}
                {packageInfo.conflicts.length > 0 && <tr>
                    <td>
                        Conflicts:
                    </td>
                    <td>
                        <ul>
                            {packageInfo.conflicts.map(e => <li key={e}>{e}</li>)}
                        </ul>
                    </td>
                </tr>}
                {packageInfo.depends.length > 0 && <tr>
                    <td>
                        Depends:
                    </td>
                    <td>
                        <ul>
                            {packageInfo.depends.map(e => <li key={e}>{e}</li>)}
                        </ul>
                    </td>
                </tr>}
                </tbody>
            </table>
        </div>
    )
};

function CloseButton() {
    return (<div className={styles.close}>
        <Link to="/">
            <CloseOutlined/>
        </Link>
    </div>)
}
