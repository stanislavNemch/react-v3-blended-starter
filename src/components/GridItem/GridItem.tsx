import style from "./GridItem.module.css";

interface ContainerProps {
    children: React.ReactNode;
}

export default function GridItem({ children }: ContainerProps) {
    return <li className={style.item}>{children}</li>;
}
