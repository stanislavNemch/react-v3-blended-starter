import style from "./Grid.module.css";

interface ContainerProps {
    children: React.ReactNode;
}

export default function Grid({ children }: ContainerProps) {
    return <ul className={style.list}>{children}</ul>;
}
