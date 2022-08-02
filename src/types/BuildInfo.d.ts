export default interface BuildInfo {
    buildTime: string;
    packages: Packages;
}

export interface Packages {
    x86_64: Package[];
    i686: Package[];
    aarch64: Package[];
    loongarch64: Package[];
    riscv64: Package[];
}

export interface Package {
    name: string;
    desc: string;
    version: string;
    csize: string;
    isize: string;
    url: string;
    provides: string[];
    depends: string[];
    conflicts: string[];
    buildTime: string;
    isAur: boolean;
    filename: string;
}
