import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearSelectProps {
  className: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function YearSelect({
  className,
  value,
  onChange,
  placeholder,
}: YearSelectProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder || "Select Year"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
