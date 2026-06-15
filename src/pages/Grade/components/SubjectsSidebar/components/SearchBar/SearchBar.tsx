type Props = {
    value: string;
    onChange: (value: string) => void;
};

export function SearchBar({
    value,
    onChange,
}: Props) {

    return (
        <input
            value={value}
            placeholder="Buscar matérias..."
            onChange={(e) =>
                onChange(e.target.value)
            }
        />
    );
}