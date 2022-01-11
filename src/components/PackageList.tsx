import React, {useContext, useEffect, useState} from 'react'
import styles from '../styles/PackageList.module.sass'
import ArchChooser from './ArchChooser'
import {Package} from '../types/BuildInfo'
import formatDate from '../utils/formatDate'
import BuildInfoContext from '../contexts/BuildInfoContext'
import {useNavigate} from 'react-router-dom'

export default () => {
    const [arch, setArch] = useState('x86_64')
    const [pkgList, setPkgList] = useState<Package[]>([])
    const buildInfo = useContext(BuildInfoContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (buildInfo) {
            setPkgList(buildInfo.packages[arch])
        }
    }, [arch, buildInfo])

    if (!buildInfo) {
        return <div className={styles.loading}>Loading Repository Info...</div>
    }

    return <div className={styles.packageList}>
        <p>Last build time: {formatDate('yyyy-MM-dd hh:mm', new Date(buildInfo.buildTime))}</p>
        <ArchChooser arch={arch} setArch={setArch}/>
        <table>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Version</th>
                <th>Build Time</th>
            </tr>
            {pkgList.map(pkg => <tr key={pkg.name} onClick={() => navigate(`/${arch}/${pkg.name}`)}>
                <td>{pkg.name}</td>
                <td>{pkg.version}</td>
                <td>{formatDate('yyyy-MM-dd hh:mm', new Date(pkg.buildTime))}</td>
            </tr>)}
            </tbody>
        </table>
    </div>
}
