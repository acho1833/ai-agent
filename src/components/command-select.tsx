import { ReactNode, useState } from 'react';
import { Button } from './ui/button';
import { Chevron } from 'react-day-picker';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from './ui/command';

type Props = {
    options: Array<{
        id: string;
        value: string;
        children: ReactNode;
    }>;
    onSelect: (value: string) => void;
    onSearch?: (search: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
};

const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = 'Select an option',
    isSearchable,
    className,
}: Props) => {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((option) => option.value === value);

    return (
        <>
            <Button
                type="button"
                variant="outline"
                className={cn(
                    'h-9 justify-between font-normal px-2',
                    !selectedOption && 'text-muted-foreground',
                    className,
                )}
                onClick={() => setOpen(true)}
            >
                <div>{selectedOption?.children ?? placeholder}</div>
                <ChevronDownIcon />
            </Button>
            <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search..." onValueChange={onSearch} />
                {options.length === 0 && (
                    <CommandList>
                        <span className="text-muted-forground text-sm">No options found</span>
                    </CommandList>
                )}
                {options.map((option) => (
                    <CommandItem
                        key={option.id}
                        onSelect={() => {
                            onSelect(option.value);
                            setOpen(false);
                        }}
                    >
                        {option.children}
                    </CommandItem>
                ))}
            </CommandResponsiveDialog>
        </>
    );
};

export default CommandSelect;
