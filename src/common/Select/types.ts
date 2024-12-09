export interface SelectProps {
    name: string;
    placeholder: string;
    options: { label: string; value: string }[];
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    t: (key: string) => string;
}
