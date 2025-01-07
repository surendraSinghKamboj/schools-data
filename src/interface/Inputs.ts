export interface InputAttributes {
  label: string;
  type: string;
  name: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
