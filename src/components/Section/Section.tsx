import style from "./Section.module.css";

interface ContainerProps {
    children: React.ReactNode;
}

export default function Section({ children }: ContainerProps) {
    return <section className={style.section}>{children}</section>;
}
