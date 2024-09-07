// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select";

//   interface SelectProps {
//     className: string;
//     options: { value: string; label: string }[];
//     placeholder?: string;
//   }

//   export function Selects({ className, options = [], placeholder }: SelectProps) {
//     const defaultValue = placeholder ? undefined : options[0]?.value;

//     return (
//       <Select defaultValue={defaultValue}>
//         <SelectTrigger className={className}>
//           <SelectValue placeholder={placeholder} />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             {placeholder && <SelectLabel>{placeholder}</SelectLabel>}
//             {options.map((option) => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//     );
//   }
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps {
  className: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function Selects({
  className,
  options = [],
  placeholder,
  value,
  onChange,
}: SelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {placeholder && <SelectLabel>{placeholder}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
