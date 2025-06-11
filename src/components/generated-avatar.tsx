import { botttsNeutral, initials } from '@dicebear/collection';
import { createAvatar, Result } from '@dicebear/core';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

type Props = {
    seed: string;
    className?: string;
    variant: 'botttsNeutral' | 'initials';
};

export const GeneratedAvatar = ({ seed, variant, className }: Props) => {
    let avatar: Result;

    if (variant === 'botttsNeutral') {
        avatar = createAvatar(botttsNeutral, {
            seed,
        });
    } else {
        avatar = createAvatar(initials, {
            seed,
            fontWeight: 500,
            fontSize: 42,
        });
    }

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
};
