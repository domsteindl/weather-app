type Props = {
    title: string;
    value: string | number;
};

export default function DetailCard({ title, value }: Props) {
    return (
        <div className={"border rounded-lg p-4 bg-white/20"}>
            <p>{title}</p>
            <p>{value}</p>
        </div>
    );
}